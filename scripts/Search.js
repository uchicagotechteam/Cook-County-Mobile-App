export const SPECIAL_CHARS = [
    // Reasonable Vowels
    {special: "æ", regular: "ae", display: true,  show_caps: true},
    {special: "œ", regular: "oe", display: true,  show_caps: true},
    {special: "ø", regular: "o",  display: false, show_caps: true},

    // Reasonable Consonants
    {special: "ð", regular: "d",  display: true,  show_caps: true},
    {special: "ɖ", regular: "d",  display: false, show_caps: true},
    {special: "þ", regular: "th", display: true,  show_caps: true},
    {special: "ß", regular: "ss", display: true,  show_caps: false},

    // Letters with strokes - Not caught by diacritic filter
    {special: "ł", regular: "l",  display: false, show_caps: true},
    {special: "ħ", regular: "h",  display: false, show_caps: true},
    {special: "đ", regular: "d",  display: false, show_caps: true},
    {special: "ŧ", regular: "t",  display: false, show_caps: true},

    // Questionable Letters - Probably overkill, but why not?
    {special: "ı", regular: "i",  display: false, show_caps: false},
    {special: "ĳ", regular: "ij", display: false, show_caps: true},
    {special: "ŋ", regular: "ng", display: false, show_caps: true},
    {special: "ĸ", regular: "k",  display: false, show_caps: false},
    {special: "ſ", regular: "s",  display: false, show_caps: false},
].sort(
    (a, b) => a.regular.localeCompare(b.regular)
);



// The parameter full_object is included for compliance with Tabulator
export function filter(search_term, option, full_object, search_params) {
    return make_filter(search_term, search_params)(option);
}

export function make_filter(search_term, search_params) {
    return (option) => make_search(search_term, {...search_params, just_filter: true})(option);
}

export function search(search_term, option, search_params) {
    return make_search(search_term, search_params)(option);
}

export function make_search(search_term, search_params) {

    // Split search string into individual lowercase terms
    var terms = search_term.split(' ')
        .filter(s => s.length > 0)
        .map(s => s.toLowerCase());
    var num_terms = terms.length;

    // Special case: If the search term is blank, match everything
    if (num_terms === 0) {
        return (opt) => true;  // eslint-disable-line no-unused-vars
    }

    return (opt) => {

        var fields_to_search = (search_params != undefined && search_params["fields"] != undefined)
            ? search_params["fields"] : Object.keys(opt);

        // Split input into individual words/terms, along with the index where that word begins
        // and the key it came from (if input is an object).
        // This will catch fields with multiple words, eg a middle name.
        // 
        // Example result for string input "John":
        //      [ {norm: "john", char: "John", index: 0}, ... ]
        // 
        // Example result for object input {"First Name": "John"}:
        //      [ {norm: "john", char: "John", index: 0, key: "First Name"} ... ]
        // 
        var fields = [];
        if (typeof opt == "string") {
            fields = string_to_search(opt);
        }
        else {

            // Loop through each searchable field in the input object
            fields_to_search.forEach(key => {

                // Concatenate the results of string_to_search with existing fields,
                // adding the key each came from in the original object
                string_to_search(opt[key]).forEach(str => {
                    str["key"] = key;
                    fields.push(str);
                });
            });
        }

        // If the number of terms exceeds the number of fields, no match
        if (num_terms > fields.length) {
            return null;
        }

        // In each object, add the field "matches" to store the indices at which a term can be found
        // Produce a boolean matrix for whether a given term matches a given field
        // Rows are fields, columns are terms
        // TODO: This will not match mixed special and plaintext characters
        let matched_fields = match_matrix(fields, terms, (field, term) => {

            // Get indices of the search term in the plaintext version of the field
            let norm = field.chars.map(f => f.norm);
            let norm_i = arr_indices(norm, term);

            // Get indices of the search term in the field with special characters and accents included
            let char = field.chars.map(f => f.char);
            let char_i = arr_indices(char, term);

            // Merge these into one array, discarding duplicate values
            // Using both allows both plaintext characters and special characters in the search term to match special characters in the field, whereas special characters in the search term do not match plaintext characters in the field.
            // That is, searching for "e" should return accented "e"s as well as plain "e"s, but searching for an accented "e" should only match instances of "e" with the same accent.
            let matches = unique_i(norm_i, char_i).map(([i,l]) => [i + field.index, l]);

            // If the search term matched any part of the field, record those matches
            // and mark this entry of the matrix with true
            if (matches.length > 0) {
                if (field["matches"] == undefined) {
                    field["matches"] = [];
                }
                field["matches"] = field["matches"].concat(matches);
                return true;
            }

            // If there were no matches, mark this entry of the matrix with false
            return false;
        });

        // Calculate how many of the fields are matched by at least one term
        // Find how many rows of the matrix contain at least one true value
        let num_fields_matched = matched_fields.reduce(
            // Increment the accumulator for each matrix row that has at least one non-empty array
            // The 0 on the end starts the accumulator from 0 - this is important
            (acc, curr) => acc + (curr.includes(true) ? 1 : 0), 0
        );

        // Create an array of terms which don't match any field
        // Find how many columns contain no true values
        let unmatched_terms = terms.filter((term, n) => {
            // Grab each matrix row's value at the current term's index (i.e. the indices where the term can be found in the row's field) and combine all these values with OR (such that if any value in this term's column is non-empty, the result will be true). Then, return it inverted for filter.
            // Equivalent to "false || matched_fields[0][n] || matched_fields[1][n] || ..."
            return !matched_fields.reduce((acc, curr) => acc || curr[n], false);
        });

        // The current option should match the search if:
        //
        //  - There are no terms which don't match any field
        //  - The total number of terms is not greater than than the number of fields with a matching term. If it were greater, then two terms would have to match the same field.
        //
        // If either of these conditions is not met, filter this option out.
        if ((unmatched_terms.length !== 0) || (num_fields_matched < num_terms)) {
            return search_params.just_filter ? false : null;
        }

        // All options past this point do match the search.

        // If user just wants to filter options, return true now instead of performing the following calculations
        if (search_params.just_filter) {
            return true;
        }

        // Initialize a variable to store the matches
        // This will mirror the structure of the original input:
        //   - If input was a string, it will be an array of indices
        //   - If input was an object, it will be an object with the same field names,
        //       each of which will be an array of indices for the value of that field
        var matches;

        // Construct matches array for string input
        if (typeof opt == "string") {
            var all_indices = concat_all(fields.map(field => field.matches));
            matches = (search_params.remove_overlap)
                ? remove_overlap_i(all_indices)
                : all_indices.sort(make_compare_i(false));
        }

        // Construct matches object for object input
        else {

            // Initialize matches to new object
            matches = {};

            // Set matches up to mimic the orignal object, where each key from the original
            // is associated with the array of all the matches found within it
            fields.forEach(field => {

                // If matches doesn't contain this field's key yet, add it
                if (matches[field.key] == undefined) {
                    matches[field.key] = [];
                }

                // If this field had any matches, add them to matches
                if (field.matches != undefined) {
                    matches[field.key] = matches[field.key].concat(field.matches);
                }
            });


            // For each key, sort the indices and remove any overlaps if desired
            if (search_params.remove_overlap) {
                Object.keys(matches).forEach(key => {
                    matches[key] = remove_overlap_i(matches[key]);
                });
            }
            else {
                Object.keys(matches).forEach(key => {
                    matches[key] = matches[key].sort(make_compare_i(false));
                });
            }
        }

        // Return the matches array/object
        return matches;
    }
}





// =-= Helper Functions =-=-=


function string_to_search(str) {
    var result = [];

    for (let i = 0; i < str.length; i++) {

        // Set index to the start of the next word, and i to the end of that word
        while (str[i] == ' ') i++;
        let index = i;
        while (str[i] != ' ' && i < str.length) i++;

        // Split the word into an array of characters, both with and without accents and
        // special characters, and add it to result. Resulting objects have the fields:
        //   char: The character as-is
        //   norm: The plaintext version of the character
        result.push({
            index, chars: split_special_chars(str.substring(index, i))
        });
    }

    return result;
}


// Split a string into characters stored as objects, where each object contains:
//   char: The character as-is, along with all accents
//   norm: The lowercase plaintext version of the character
export function split_special_chars(str) {

    // Initialize the return array
    let ret = [];

    // Split the input string into an array of characters, and loop through each
    Array.from(str).forEach(char => {

        // If the current character is an accent, include it in the previous char
        // This catches accents which are separated from the base character for some reason, as well as characters with multiple accents, such as those in the Vietnamese alphabet
        if (char.match(/[\u0300-\u036f]/)) {
            ret[ret.length-1].char += char;
        }

        // Otherwise, add the character in plaintext and as-is
        else {
            let norm = parse_text(char.toLowerCase(), {
                accents: "none",
                special: false
            });
            ret.push({char, norm});
        }
    });

    // Return the return array
    return ret;
}


// Format special characters in a string based on options:
//   - accents:
//      "none"      - No accents
//      "separated" - Accents are separate characters
//      "all"       - Accents included
//   - special:
//      true  - Keep special characters
//      false - Replace special characters with keyboard equivalents
//   - case:
//      "lower" - Make the result lowercase
//      "upper" - Make the result uppercase
//      "keep"  - Don't change case
export function parse_text(str, options) {
    var ret = str.slice();

    let defaults = {
        accents: "none",
        special: false,
        case: "keep",
    };

    let opts = {...defaults, ...options};

    switch (opts.accents) {
        case "none":
            // Source: https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
            ret = normalize(ret).replace(/[\u0300-\u036f]/g, "");
            break;
        case "separate":
            ret = normalize(ret);
            break;
        default:
            break;
    }

    if (!opts.special) {
        SPECIAL_CHARS.forEach(obj => {
            ret = ret.replace(new RegExp(obj.special, "g"), obj.regular);
        })
    }

    switch (opts.case) {
        case "lower":
            ret = ret.toLowerCase();
            break;
        case "upper":
            ret = ret.toUpperCase();
            break;
        default:
            break;
    }

    return ret;

    function normalize(str) {
        return str.normalize("NFD");
    }
}


// Convert two arrays (rows, cols) into a matrix of booleans, where each cell represents whether the given row value and column value match according to some specified matching function (match).
function match_matrix(rows, cols, match) {
    return rows.map(row => cols.map(col => match(row, col)));
}

// Given some number of arrays, each storing arrays of the form [start_index, length], returns a new array where all duplicate start indices are replaced with a single entry containing the greatest length that index had been paired with.
// That is, merges arrays and removes duplicates, and in case of conflicting lengths, chooses the longest.
function unique_i(...arrs) {

    // Init a new object which will store the max length for each index
    let inds = {};

    // Loop through each input
    arrs.forEach(arr => {

        // For each entry in the array, add it to the object if it doesn't already exist, or if it does, replace its length value if applicable.
        arr.forEach(([i, len]) => {
            inds[i] = (inds[i] == null) ? len : Math.max(inds[i], len);
        });
    });

    // Map each key/value pair in the object (index/length) to an array
    return Object.keys(inds).map(k => [Number(k), inds[k]]).sort();
}

// Given an array of indices, remove any index which overlaps an earlier index
function remove_overlap_i(indices) {

    var new_indices = [];

    // Sort indices by the numerical values of their start positions, then filter out overlaps
    indices.sort(make_compare_i(true)).forEach((curr, n, arr) => { // eslint-disable-line no-unused-vars

        // Keep the first index regardless
        if (n == 0) new_indices = [curr];

        // Keep the current index if it is not within the length of the most recent included index
        let prev = new_indices[new_indices.length-1];
        if (curr[0] - prev[0] >= prev[1]) {
            new_indices.push(curr);
        }
    });

    return new_indices;
}

// Compare two indices for sorting the array
// If start positions are different, sort earlier indices first
// If start positions are the same:
//   - If longer_first is true, put the index with the greater length first
//   - Otherwise, put the index with the smaller length first
function make_compare_i(longer_first) {

    // Return a comparison function
    return ([a_index, a_len], [b_index, b_len]) => {
        var diff = a_index - b_index;
        if (diff === 0) {
            return longer_first ? (b_len - a_len) : (a_len - b_len);
        }
        else {
            return diff;
        }
    }
}

// Flatten an array of arrays into a single array with all elements
function concat_all(arr) {
    return arr.reduce( (acc, curr) => acc.concat(curr) );
}

// Find all indices of a substring in a search string broken down into an array of substrings
// Takes an array (arr) of strings which represents a list of segments of some full search string.
// Returns all indices in the array where substring begins, along with the number of segments it crosses through.
function arr_indices(arr, sub) {
    let indices = [];
    let arr_str = arr.join("");
    let search_len = arr_str.length - sub.length + 1;

    let arr_indices = [];
    arr.forEach((item, n) => {
        for (var i = 0; i < item.length; i++) {
            arr_indices.push(n);
        }
    });

    for (var start = 0; start < search_len; start++) {
        let i = 0;
        let match = true;

        while (i < sub.length) {
            if (sub[i].toLowerCase() != arr_str[start+i].toLowerCase()) {
                match = false;
                break;
            }
            i++;
        }
        if (match) {
            var len;
            let end = start + i - 1;

            if (end == arr_indices.length) {
                len = arr.length - arr_indices[start] + 1;
            } else {
                len = arr_indices[end] - arr_indices[start] + 1;
            }

            indices.push( [arr_indices[start], len] );
        }
    }

    return indices;
}


export function custom_filter_func(filter_groups, option, row, params) {

    // Parse the desired value of the cell, if the filter parameters specify a way to format it
    var cell_val = params.get_cell_val != undefined ? params.get_cell_val(option) : option;

    // Result will be true if any of the groups passes
    return filter_groups.some(filters => {

        // Group result will be true if every filter passes
        return filters.every(filter => {

            // Parse desired value(s) from filter and actual value from user input
            var option_val = params.parse_option_val(filter.option, cell_val, filter.value);
            var filter_val = params.parse_filter_val(filter.option, filter.value);
            var second_val = params.parse_filter_val(filter.option, filter.value2);

            // If the search term was invalid for some reason, skip over this filter
            if (filter_val == null) return true;

            // By this point, option_val holds the appropriate value of the current cell,
            // and filter_val holds the desired value from the filter, e.g.
            //    option_val = 2019
            //    filter_val = 2015

            // If there are two values from the filter, package them into an array
            var filter_vals = (second_val == undefined) ? filter_val : [filter_val, second_val];

            // Get the operation with the matching name from the filter parameters
            var operation = params.operations[filter.op_index];

            // Use the fltering function provided by that operation
            return operation.filter(option_val, filter_vals, filter.inclusive);
        });
    });
}
