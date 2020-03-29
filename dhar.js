Hooks.on("wfrp4e:rollCastTest", testResults => {
  if (WFRP4E.magicWind[testResults.spell.data.lore.value] == "Dhar")
  {
    if (testResults.roll == 88)
    {
      testResults.other = testResults.other ? testResults.other + "<br>" + game.i18n.localize("EiS.MajorDhar") : game.i18n.localize("EiS.MajorDhar")
    }
    else if (testResults.roll.toString().includes("8"))
 		{
       testResults.other = testResults.other ? testResults.other + "<br>" + game.i18n.localize("EiS.MinorDhar") : game.i18n.localize("EiS.MinorDhar")
    }
    if (testResults.roll % 11 == 0)
		{
			testResults.other = testResults.other ? testResults.other + "<br>" + game.i18n.localize("EiS.DoubleRolled") : game.i18n.localize("EiS.DoubleRolled")
		}
  } 
})

Hooks.on("wfrp4e:rollChannelTest", testResults => {
  if (WFRP4E.magicWind[testResults.spell.data.lore.value] == "Dhar")
  {
    if (testResults.roll == 88)
    {
      testResults.other = testResults.other ? testResults.other + "<br>" + game.i18n.localize("EiS.MajorDhar") : game.i18n.localize("EiS.MajorDhar")
    }
    else if (testResults.roll.toString().includes("8"))
 		{
       testResults.other = testResults.other ? testResults.other + "<br>" + game.i18n.localize("EiS.MinorDhar") : game.i18n.localize("EiS.MinorDhar")
    }
    if (testResults.roll % 11 == 0)
		{
			testResults.other = testResults.other ? testResults.other + "<br>" + game.i18n.localize("EiS.DoubleRolled") : game.i18n.localize("EiS.DoubleRolled")
		}
  } 
})

// Hooks.on("ready", () => {
// 	if (game.settings.get("eis", "dharRules"))
// 	{
// 	  DiceWFRP.rollCastTest = function(testData) {
//     let spell = testData.extra.spell;
//     let testResults = this.rollTest(testData);

//     let miscastCounter = 0;
// 	testData.function = "rollCastTest"
	
// 	let dhar = false;
// 	if (WFRP4E.magicWind[spell.data.lore.value] == "Dhar")
// 	  dhar = true;

// 	if (spell.data.lore.value == "witchcraft")
// 	  miscastCounter++;

//     // Partial channelling - reduce CN by SL so far
//     if (game.settings.get("wfrp4e", "partialChannelling"))
//     {
//       spell.data.cn.value -= spell.data.cn.SL;
//     }
//     // Normal Channelling - if SL has reached CN, CN is considered 0
//     else if (spell.data.cn.SL >= spell.data.cn.value)
//     {
//       spell.data.cn.value = 0;
//     }

// 	if (dhar)
// 	{
// 		if (testResults.roll.toString().includes("8"))
// 		{
// 			testResults.other = game.i18n.localize("EiS.MinorDhar")
// 			miscastCounter++

// 			if (testResults.roll == 88)
// 			{
// 				testResults.other = game.i18n.localize("EiS.MajorDhar")
// 				miscastCounter++;
// 			}
// 		}

// 		else if (testResults.roll % 11 == 0)
// 		{
// 			testResults.other = game.i18n.localize("EiS.DoubleRolled")
// 		}

// 	}
// 	else if (testData.extra.malignantInfluence)
// 		if (Number(testResults.roll.toString().split('').pop()) == 8)
// 			miscastCounter++;

//     // Witchcraft automatically miscast
//     if (spell.data.lore.value == "witchcraft")
//       miscastCounter++;

//     // slOver is the amount of SL over the CN achieved
//     let slOver = (Number(testResults.SL) - spell.data.cn.value)

//     // Test itself was failed
//     if (testResults.description.includes("Failure"))
//     {
//       testResults.description = game.i18n.localize("ROLL.CastingFailed")
//       // Miscast on fumble
//       if (testResults.roll % 11 == 0 || testResults.roll == 100)
//       {
//         testResults.extra.color_red = true;
//         miscastCounter++;
//       }
//     }
//     else if (slOver < 0) // Successful test, but unable to cast due to not enough SL
//     {
//       testResults.description = game.i18n.localize("ROLL.CastingFailed")

//       // Critical Casting - succeeds only if the user chooses Total Power option (which is assumed)
//       if (testResults.roll % 11 == 0)
//       {
//         testResults.extra.color_green = true;
//         testResults.description = game.i18n.localize("ROLL.CastingSuccess")
//         testResults.extra.critical = game.i18n.localize("ROLL.TotalPower")

//         if (!testData.extra.ID)
//           miscastCounter++;
//       }
//     }

//     else // Successful test, casted - determine overcasts
//     {
//       testResults.description = game.i18n.localize("ROLL.CastingSuccess")
//       let overcasts = Math.floor(slOver / 2);

//       if (dhar) 
//         overcasts = slOver

//       testResults.overcasts = overcasts;


//       if (testResults.roll % 11 == 0)
//       {
//         testResults.extra.critical = game.i18n.localize("ROLL.CritCast")
//         testResults.extra.color_green = true;

//         if (!testData.extra.ID)
//           miscastCounter++;
//       }

// 	}
	
// 	if (miscastCounter > 2)
// 		miscastCounter = 2

//     // Use the number of miscasts to determine what miscast it becomes (null<miscast> is from ingredients)
//     switch (miscastCounter)
//     {
//       case 1:
//         if (testData.extra.ingredient)
//           testResults.extra.nullminormis = game.i18n.localize("ROLL.MinorMis")
//         else
//           testResults.extra.minormis = game.i18n.localize("ROLL.MinorMis")
//         break;
//       case 2:
//         if (testData.extra.ingredient)
//         {
//           testResults.extra.nullmajormis = game.i18n.localize("ROLL.MajorMis")
//           testResults.extra.minormis = game.i18n.localize("ROLL.MinorMis")
//         }
//         else
//           testResults.extra.majormis = game.i18n.localize("ROLL.MajorMis")
//         break;
//       case 3:
//         testResults.extra.majormis = game.i18n.localize("ROLL.MajorMis")
//         break;
//     }

//     if (testData.extra.ingredient)
//       miscastCounter--;
//     if (miscastCounter < 0)
//       miscastCounter = 0;
//     if (miscastCounter > 2)
//       miscastCounter = 2

//     // Calculate Damage if the spell has it specified and succeeded in casting
//     try
//     {
//       if (testData.extra.spell.damage && testResults.description.includes(game.i18n.localize("ROLL.CastingSuccess")))
//         testResults.damage = Number(testResults.SL) +
//         Number(testData.extra.spell.damage)
//     }
//     catch (error)
//     {
// 		ui.notifications.error(game.i18n.localize("Error.DamageCalc") + ": " + error)
//     } // If something went wrong calculating damage, do nothing and continue


//     return testResults;
//   }

//   DiceWFRP.rollChannellTest = function(testData, actor) {
//     let spell = testData.extra.spell;
//     let miscastCounter = 0;

//     let testResults = this.rollTest(testData);
//     testData.function = "rollChannellTest"

// 	if (spell.data.lore.value == "witchcraft")
// 	miscastCounter++;

// 	let dhar = false;
// 	if (WFRP4E.magicWind[spell.data.lore.value] == "Dhar")
// 		dhar = true;
// 	if (testData.extra.channellSkill && testData.extra.channellSkill.name.includes("Dhar"))
// 		dhar = true;
		
// 	let SL = testResults.SL;

	
// 	if (dhar)
// 	{
// 		if (testResults.roll.toString().includes("8"))
// 		{
// 			testResults.other = game.i18n.localize("EiS.MinorDhar")
// 			miscastCounter++

// 			if (testResults.roll == 88)
// 			{
// 				testResults.other = game.i18n.localize("EiS.MajorDhar")
// 			}
// 		}

// 		else if (testResults.roll % 11 == 0)
// 		{
// 			testResults.other = game.i18n.localize("EiS.DoubleRolled")
// 		}
// 	}

// 	else if (testData.extra.malignantInfluence)
// 	{
// 	if (Number(testResults.roll.toString().split('').pop()) == 8)
// 		miscastCounter++;
// 	}
//     // Test itself was failed
//     if (testResults.description.includes(game.i18n.localize("Failure")))
//     {
//       // Optional Rule: If SL in extended test is -/+0, counts as -/+1
//       if (Number(SL) == 0 && game.settings.get("wfrp4e", "extendedTests"))
//         SL = -1;

//       testResults.description = game.i18n.localize("ROLL.ChannelFailed")
//       // Major Miscast on fumble
//       if (testResults.roll % 11 == 0 || testResults.roll % 10 == 0 || testResults.roll == 100)
//       {
//         testResults.extra.color_red = true;
//         miscastCounter += 2;
//       }
//     }
//     else // Successs - add SL to spell for further use
//     {
//       testResults.description = game.i18n.localize("ROLL.ChannelSuccess")

//       // Optional Rule: If SL in extended test is -/+0, counts as -/+1
//       if (Number(SL) == 0 && game.settings.get("wfrp4e", "extendedTests"))
//         SL = 1;

//       // Critical Channel - miscast and set SL gained to CN
//       if (testResults.roll % 11 == 0)
//       {
//         testResults.extra.color_green = true;
//         spell.data.cn.SL = spell.data.cn.value;
//         testResults.extra.criticalchannell = game.i18n.localize("ROLL.CritChannel")
//         if (!testData.extra.AA)
//           miscastCounter++;
//       }
//     }

//     // Add SL to CN and update actor
//     spell.data.cn.SL += Number(SL);
//     if (spell.data.cn.SL > spell.data.cn.value)
//       spell.data.cn.SL = spell.data.cn.value;
//     else if (spell.data.cn.SL < 0)
//       spell.data.cn.SL = 0;

//     actor.updateEmbeddedEntity("OwnedItem",
//     {
//       _id: spell._id,
//       'data.cn.SL': spell.data.cn.SL
//     });


// 	if (miscastCounter > 2)
// 		miscastCounter = 2

//     // Use the number of miscasts to determine what miscast it becomes (null<miscast> is from ingredients)
//     switch (miscastCounter)
//     {
//       case 1:
//         if (testData.extra.ingredient)
//           testResults.extra.nullminormis = game.i18n.localize("ROLL.MinorMis")
//         else
//           testResults.extra.minormis = game.i18n.localize("ROLL.MinorMis")
//         break;
//       case 2:
//         if (testData.extra.ingredient)
//         {
//           testResults.extra.nullmajormis = game.i18n.localize("ROLL.MajorMis")
//           testResults.extra.minormis = game.i18n.localize("ROLL.MinorMis")
//         }
//         else
//           testResults.extra.majormis = game.i18n.localize("ROLL.MajorMis")
//         break;
//       case 3:
//         testResults.extra.majormis = game.i18n.localize("ROLL.MajorMis")
//         break;
// 	}
	
//     if (testData.extra.ingredient)
//       miscastCounter--;
//     if (miscastCounter < 0)
//       miscastCounter = 0;
//     if (miscastCounter > 2)
//       miscastCounter = 2
//     return testResults;
//   }
// }
// });