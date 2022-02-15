////package com.example.android.testing.espresso.BasicSample
package com.projectrainbow
//
//import androidx.test.ext.junit.rules.ActivityScenarioRule
//import android.app.Activity
//import androidx.test.espresso.Espresso.onView
//import androidx.test.espresso.action.ViewActions
//import androidx.test.espresso.action.ViewActions.*
//import androidx.test.espresso.assertion.ViewAssertions.matches
//import androidx.test.espresso.matcher.ViewMatchers
//import androidx.test.espresso.matcher.ViewMatchers.withId
//import androidx.test.espresso.matcher.ViewMatchers.withText
//import androidx.test.ext.junit.runners.AndroidJUnit4
//import androidx.test.filters.LargeTest
//import MainActivity
//import org.junit.Rule
//import org.junit.Test
//import org.junit.runner.RunWith
//
//
///**
// * The kotlin equivalent to the ChangeTextBehaviorTest, that
// * showcases simple view matchers and actions like [ViewMatchers.withId],
// * [ViewActions.click] and [ViewActions.typeText], and ActivityScenarioRule
// *
// *
// * Note that there is no need to tell Espresso that a view is in a different [Activity].
// */
//@RunWith(AndroidJUnit4::class)
//@LargeTest
//class ChangeTextBehaviorKtTest {
//
//    /**
//     * Use [ActivityScenarioRule] to create and launch the activity under test before each test,
//     * and close it after each test. This is a replacement for
//     * [androidx.test.rule.ActivityTestRule].
//     */
//    @get:Rule var activityScenarioRule = activityScenarioRule<MainActivity>()
//
//    @Test
//    fun changeText_sameActivity() {
//
//        // Type text and then press the button.
//        onView(withId(R.id.editTextUserInput))
//                .perform(typeText(STRING_TO_BE_TYPED), closeSoftKeyboard())
//        onView(withId(R.id.changeTextBt)).perform(click())
//
//        // Check that the text was changed.
//        onView(withId(R.id.textToBeChanged)).check(matches(withText(STRING_TO_BE_TYPED)))
//    }
//
//    @Test
//    fun changeText_newActivity() {
//        // Type text and then press the button.
//        onView(withId(R.id.editTextUserInput)).perform(typeText(STRING_TO_BE_TYPED),
//                closeSoftKeyboard())
//        onView(withId(R.id.activityChangeTextBtn)).perform(click())
//
//        // This view is in a different Activity, no need to tell Espresso.
//        onView(withId(R.id.show_text_view)).check(matches(withText(STRING_TO_BE_TYPED)))
//    }
//
//    companion object {
//
//        val STRING_TO_BE_TYPED = "Espresso"
//    }
//}
