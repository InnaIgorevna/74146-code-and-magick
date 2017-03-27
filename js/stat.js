function getMaxResult(arr){
	var max = arr[0];
	for (i = 1; i < arr.length; i++) {
		if(max < arr[i]){
			max = arr[i];
		}	
	}
	return max;
}

function getColumnColor(name){
	var transparency = Math.random();
	var columnColor;

	if (name == 'Вы') {
		columnColor = 'rgba(255, 0, 0, 1)';
	} else {
		columnColor = 'rgba(0, 0, 255,' + transparency + ')';
	}
	return columnColor;
}

function drawHistogram(ctx, names, times, drawStartX, drawStartY){
	var maxTime = getMaxResult(times);
	var maxColumnHeight = 150;
	var columnWidth = 40;
	var columnOffset = 50;
   
	for(i = 0; i < names.length; i++){
		var rectHeight = maxColumnHeight * (times[i]/ maxTime);
		var columnStartX = drawStartX + (i * (columnWidth + columnOffset));
		var columnStartY = maxColumnHeight + drawStartY - rectHeight;
		
		ctx.fillStyle = getColumnColor(names[i]);
		ctx.fillRect(columnStartX, columnStartY, columnWidth, rectHeight);
		ctx.fillStyle  = "black";
		ctx.fillText(names[i], columnStartX, maxColumnHeight + drawStartY + 20);
		ctx.fillText(times[i].toFixed(0), columnStartX, columnStartY - 5);
	}
}

window.renderStatistics = function(ctx, names, times){
   	var statisticsWindowX = 100;
	var statisticsWindowY = 10;
	var statisticsWindowWidth = 420;
	var statisticsWindowHeight = 270;
	var statisticsWindowFont = '16px PT Mono';
	var drawStartX = statisticsWindowX + 30;
	var drawStartY = 100;

	ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
	ctx.fillRect(statisticsWindowX+10, statisticsWindowY+10, statisticsWindowWidth, statisticsWindowHeight);
	ctx.fillStyle = 'white';
	ctx.fillRect(statisticsWindowX , statisticsWindowY, statisticsWindowWidth, statisticsWindowHeight);

	ctx.font = statisticsWindowFont;
	ctx.fillStyle  = "black";
	ctx.fillText('Ура, вы победили!', drawStartX, 50);
	ctx.fillText('Список результатов:', drawStartX, 70);

    drawHistogram(ctx, names, times, drawStartX, drawStartY);
}