AFRAME.registerComponent("bullets",{
    init : function(){
        this.shootBullet();
        },
    shootBullet: function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key === "b"){
                var bullet = document.createElement("a-entity");
                bullet.setAttribute("gltf-model",
                    "./models/bowling_ball/scene.gltf"
                )
                bullet.setAttribute("scale",{
                    x:3,
                    y:3,
                    z:3
                });
                bullet.setAttribute("material",{
                    "color":"black"
                });
                bullet.setAttribute("dynamic-body",{
                    "mass":"5",
                    "shape":"sphere"
                })

                var camera = document.querySelector("#camera").object3D;
                var cam = document.querySelector("#camera");
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);
                pos = cam.getAttribute("position");
                bullet.setAttribute("position",{
                    "x":pos.x,
                    "y":pos.y,
                    "z":pos.z
                });
                bullet.setAttribute("velocity",direction.multiplyScalar(-10))
                var scene = document.querySelector("#scene");
                bullet.addEventListener("collide", this.removeBullet);
                scene.appendChild(bullet);
            }
        })

    } ,
    
    removeBullet: function (e) {
        //bullet element
        var element = e.detail.target.el;
    
        //element which is hit
        var elementHit = e.detail.body.el;
    
        if (elementHit.id.includes("pin")) {
          elementHit.setAttribute("material", {
            opacity: 0.5,
            // transparent: true,
          });
    
          //impulse and point vector
          var impulse = new CANNON.Vec3(0, 1, -15);
          var worldPoint = new CANNON.Vec3().copy(
            elementHit.getAttribute("position")
          );
    
          elementHit.body.applyImpulse(impulse, worldPoint);
    
          //remove event listener
          element.removeEventListener("collide", this.removeBullet);
    
          //remove the bullets from the scene
          var scene = document.querySelector("#scene");
          scene.removeChild(element);
        }
      },
})