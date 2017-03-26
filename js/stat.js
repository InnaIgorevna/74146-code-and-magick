window.renderStatistics = function(ctx, names, times){
	ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
	ctx.fillRect(110, 20, 420, 270);
	ctx.fillStyle = 'white';
	ctx.fillRect(100, 10, 420, 270);

	ctx.font = '16px PT Mono';
	ctx.fillStyle  = "black";
	ctx.fillText('Ура, вы победили!', 130, 50);
	ctx.fillText('Список результатов:', 130, 70);

	var maxTime = times[0];
	for (i = 1; i < times.length; i++) {
		if(maxTime < times[i]){
			maxTime = times[i];
		}	
	}

	for(i = 0; i < names.length; i++){

		if (names[i] == 'Вы') {
			ctx.fillStyle = 'rgba(255, 0, 0, 1)';
		} else {
			ctx.fillStyle = 'rgba(0, 0, 255,' + Math.random() + ')';
		}

		var rectHeight = 150 * (times[i]/ maxTime);

		ctx.fillRect(130 + (i * 90), 250 - rectHeight, 40, rectHeight);
		ctx.fillStyle  = "black";
		ctx.fillText(names[i], 130 + (i * 90), 270);
		ctx.fillText(times[i].toFixed(0), 130+ (i * 90), 245 - rectHeight);
	}

}