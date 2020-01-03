
     DiceWFRP.rollCastTest = (testData) => {
        let spell = testData.extra.spell;
        let testResults = DiceWFRP.rollTest(testData);
  
        let miscastCounter = 0;
        testData.function = "rollCastTest"
            
      let dhar = false;
      if (WFRP4E.magicWind[spell.data.lore.value] == "Dhar")
        dhar = true;

      if (spell.data.lore.value == "witchcraft")
        miscastCounter++;

        if (dhar)
        {
            if (testResults.roll.toString().includes("8"))
            {
                testResults.other = "All living souls within Willpower yards suffer a Minor Corrupting Influence and a Minor Miscast; a single result applies to all those within the area affected."
                miscastCounter++
    
                if (testResults.roll == 88)
                {
                    testResults.other = "All living souls within Willpower yards suffer a Major Corrupting Influence and a Major Miscast; a single result applies to all those within the area affected."
                    miscastCounter++;
                }
            }
    
            else if (testResults.roll % 11 == 0)
            {
                testResults.other = "Counts as a minor corrupting influence"
            }
    
        }
        else if (testData.extra.malignantInfluence)
            if (Number(testResults.roll.toString().split('').pop()) == 8)
                miscastCounter++;
  
        if (game.settings.get("wfrp4e", "partialChannelling"))
        {
          spell.data.cn.value -= spell.data.cn.SL;
        }
        else if (spell.data.cn.SL >= spell.data.cn.value)
        {
          spell.data.cn.value = 0;
        }  
        let slOver = (Number(testResults.SL) - spell.data.cn.value)
  
        if (testResults.description.includes("Failure")) // Failed Test
        {
          testResults.description = "Casting Failed"
          if (testResults.roll % 11 == 0 || testResults.roll == 100)
          {
            testResults.extra.color_red = true;
            miscastCounter++;
          }
        }
        else if (slOver < 0) // Successful test, but unable to cast
        {
          testResults.description = "Casting Failed"
  
          if (testResults.roll % 11 == 0)
          {
            testResults.extra.color_green = true;
            testResults.description = "Casting Succeeded"
            testResults.extra.critical = "Total Power"
  
            if (!testData.extra.ID)
              miscastCounter++;
          }
        }
        else // Successful test, casted
        {
          testResults.description = "Casting Succeeded"
          let overcasts = Math.floor(slOver / 2);
          if (dhar) 
            overcasts = slOver
          testResults.overcasts = overcasts;
  
          // If no ID
          if (testResults.roll % 11 == 0)
          {
            testResults.extra.critical = "Critical Cast"
            testResults.extra.color_green = true;
  
            if (!testData.extra.ID)
              miscastCounter++;
          }
  
        }
  
        switch (miscastCounter)
        {
          case 1:
            if (testData.extra.ingredient)
              testResults.extra.nullminormis = "Minor Miscast"
            else
              testResults.extra.minormis = "Minor Miscast"
          break;
          case 2:
              if (testData.extra.ingredient)
              {
                testResults.extra.nullmajormis = "Major Miscast"
                testResults.extra.minormis = "Minor Miscast"
              }
             else
               testResults.extra.majormis = "Major Miscast"
               break;
          case 3:
          testResults.extra.majormis = "Major Miscast"
          break;
        }
  
        if (testData.extra.ingredient)
          miscastCounter--;
        if (miscastCounter < 0)
          miscastCounter = 0;
        if (miscastCounter > 2)
          miscastCounter = 2
  
          try
          {
            if (testData.extra.spell.damage && testResults.description.includes("Succeeded"))
              testResults.damage = Number(testResults.SL) +
                                   Number(testData.extra.spell.damage)
          }
          catch (error)
          {
            ui.notifications.error("Error calculating damage: " + error)
          } // If something went wrong calculating damage, do nothing and continue
  
  
        return testResults;
      }



DiceWFRP.rollChannellTest = (testData, actor) => {
    let spell = testData.extra.spell;
    let miscastCounter = 0;

    let testResults = DiceWFRP.rollTest(testData);
    testData.function = "rollChannellTest"

    if (spell.data.lore.value == "witchcraft")
        miscastCounter++;
    
    let dhar = false;
    if (WFRP4E.magicWind[spell.data.lore.value] == "Dhar")
        dhar = true;
    if (testData.extra.channellSkill && testData.extra.channellSkill.includes("Dhar"))
        dhar = true;
        
     let SL = testResults.SL;

     
    if (dhar)
    {
        if (testResults.roll.toString().includes("8"))
        {
            testResults.other = "All living souls within Willpower yards suffer a Minor Corrupting Influence and a Minor Miscast; a single result applies to all those within the area affected."
            miscastCounter++

            if (testResults.roll == 88)
            {
                testResults.other = "All living souls within Willpower yards suffer a Major Corrupting Influence and a Major Miscast; a single result applies to all those within the area affected."
                miscastCounter++;
            }
        }

        else if (testResults.roll % 11 == 0)
        {
            testResults.other = "Counts as a minor corrupting influence"
        }

    }

    else if (testData.extra.malignantInfluence)
     {
       if (Number(testResults.roll.toString().split('').pop()) == 8)
         miscastCounter++;
     }

      if (testResults.description.includes("Failure")) // Failed Test
      {
        // Optional Rule: If SL in extended test is -/+0, counts as -/+1
        if (Number(SL) == 0 && game.settings.get("wfrp4e", "extendedTests"))
          SL = -1;

       testResults.description = "Channell Failed"
       if (testResults.roll % 11 == 0 || testResults.roll % 10 == 0 || testResults.roll == 100)
       {
         testResults.extra.color_red = true;
         miscastCounter += 2;
       }
      }
     else
     {
       testResults.description = "Channell Succeeded"

        // Optional Rule: If SL in extended test is -/+0, counts as -/+1
       if (Number(SL) == 0 && game.settings.get("wfrp4e", "extendedTests"))
        SL = 1;

        if (testResults.roll % 11 == 0)
       {
         testResults.extra.color_green = true;
         spell.data.cn.SL = spell.data.cn.value;
         testResults.extra.criticalchannell = "Critical Channell"
         if (!testData.extra.AA)
           miscastCounter++;
       }
     }

     // Add SL to CN and update actor
     spell.data.cn.SL += Number(SL);
     if (spell.data.cn.SL > spell.data.cn.value)
      spell.data.cn.SL = spell.data.cn.value;
    else if (spell.data.cn.SL < 0)
     spell.data.cn.SL = 0;

     actor.updateOwnedItem({id: spell.id , 'data.cn.SL' : spell.data.cn.SL});

     switch (miscastCounter)
     {
       case 1:
         if (testData.extra.ingredient)
           testResults.extra.nullminormis = "Minor Miscast"
         else
           testResults.extra.minormis = "Minor Miscast"
       break;
       case 2:
           if (testData.extra.ingredient)
           {
             testResults.extra.nullmajormis = "Major Miscast"
             testResults.extra.minormis = "Minor Miscast"
           }
          else
            testResults.extra.majormis = "Major Miscast"
            break;
       case 3:
          testResults.extra.majormis = "Major Miscast"
       break;
     }

     if (testData.extra.ingredient)
       miscastCounter--;
     if (miscastCounter < 0)
       miscastCounter = 0;
     if (miscastCounter > 2)
       miscastCounter = 2
     return testResults;
}