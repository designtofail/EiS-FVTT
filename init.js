Hooks.on("init", () => {
	game.settings.register("eis", "dharRules", {
		name : "Dhar Spellcasting Rules",
		hint : "Use the special Dhar spellcasting rules detailed on page 78 of the Companion",
		scope : "world",
		config : true,
		default : true,
		type : Boolean
	});
})
