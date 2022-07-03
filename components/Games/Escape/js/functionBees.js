import Bee from "../classes/BeeClass";


export function handleBees(canvas, ctx, mouse, player = null, enemy = null, beesArray = null, gameFrame = 0, ratioDevice = 1 /* for desktop */, beeImage){
    if( gameFrame % 50 === 0 ){
        beesArray.push(new Bee(canvas, ctx, mouse, player, gameFrame, ratioDevice, beeImage));
    }
    
    for (let i = 0; i < beesArray.length; i++) {                        
            if( beesArray[i].y < 0 - beesArray[i].radius * 2 ){
                beesArray.splice(i, 1);
                //console.log('finito : ' + i);
            }

            if( beesArray[i] ){
                if( beesArray[i].distance < beesArray[i].radius + player.radius){
                    //console.log('collision')
                    if( !beesArray[i].counted ){
                        /*
                        if( beesArray[i].sound == 'sound1' ){
                            beeSound.play();
                        }else {
                            beeSound1.play();
                        }
                        */
                        
                        //beeHitImage.src = 'bee_hit.png';
                        //ctx.drawImage(beeHitImage, this.x - 75, this.y - 90, this.radius * 2.8, this.radius * 2.8);
                        
                        //score++;
                        beesArray[i].counted = true;
                        beesArray[i].update();
                        beesArray[i].draw();
                        beesArray.splice(i, 1);
                    }
                }
            }
        
            if( beesArray[i] ){
                beesArray[i].update();
                beesArray[i].draw();
            }
    }
}