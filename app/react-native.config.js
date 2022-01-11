module.exports = {
	assets: ['./src/assets/fonts'],
	dependencies: {
		'react-native-gesture-handler': {
			platforms: {
				android: null,
				ios: null,
			},
		},
	},
	project: {
		"android": {
	        "stringsPath": "app\\src\\main\\res\\values\\strings.xml",
	        "mainFilePath": "app\\src\\main\\java\\com\\projectrainbow\\com\\projectrainbow\\MainApplication.java"
	    }
	}
}
