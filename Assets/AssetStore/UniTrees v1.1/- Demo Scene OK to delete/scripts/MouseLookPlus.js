/// This is a modified javascript conversion of the Standard Assets MouseLook script.
/// Also added is functionallity of using a key to look up, down, left and right in adddition to the Mouse.
/// Everything is on by default. You will want to turn off/on stuff depending on what you're doing.
 
/// You can also modify the script to use the KeyLook functions to control an object's rotation.
/// Try using MouseXandY on an object. Actually it works as is but you'll want to clean it up ;)
 
/// As of this version the key and mouse fight if used at the same time (ie up key and down mouse jitters).
 
/// Minimum and Maximum values can be used to constrain the possible rotation
 
/// To make an FPS style character:
/// - Create a capsule.
/// - Add a rigid body to the capsule
/// - Add the MouseLookPlus script to the capsule.
///   -> Set the script's Axis to MouseX in the inspector. (You want to only turn character but not tilt it)
/// - Add FPSWalker script to the capsule
 
/// - Create a camera. Make the camera a child of the capsule. Reset it's transform.
/// - Add the MouseLookPlus script to the camera.
///   -> Set the script's Axis to MouseY in the inspector. (You want the camera to tilt up and down like a head. The character already turns.)
 
/// - Name an Input element LookUp and assign positive and negative keys to look up and down by key
/// - Name an Input element LookAround and assign positive and negative keys to look left and right by key
 
    enum Axes {MouseXandY, MouseX, MouseY}
    var Axis : Axes = Axes.MouseXandY;
 
    var sensitivityX = 15.0;
    var sensitivityY = 15.0;
 
    var minimumX = -360.0;
    var maximumX = 360.0;
 
    var minimumY = -60.0;
    var maximumY = 60.0;
 
    var rotationX = 0.0;
    var rotationY = 0.0;
 
    var lookSpeed = 2.0;
    
    private var cameraHeight : float = 1.0;
    public var cameraObject : GameObject;
    
    
 
    function Update ()
    {
        
        if (cameraObject){
	        if (Input.GetAxis("Mouse ScrollWheel") ){
	        	cameraHeight += -3* Input.GetAxis("Mouse ScrollWheel");
	        	if (cameraHeight >30 ) { cameraHeight =30; }
	        	if (cameraHeight <0 ) { cameraHeight = 0; }
	        	cameraObject.transform.localPosition.y = cameraHeight;
	        	}
        	}
        
        if (Axis == Axes.MouseXandY)
        {
            // Read the mouse input axis
            rotationX += Input.GetAxis("Mouse X") * sensitivityX;
            rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
 
            // Call our Adjust to 360 degrees and clamp function
            Adjust360andClamp();
 
          
 
         
 
 
         
        }
        else if (Axis == Axes.MouseX)
        {
            // Read the mouse input axis
            rotationX += Input.GetAxis("Mouse X") * sensitivityX;
 
            // Call our Adjust to 360 degrees and clamp function
            Adjust360andClamp();
 
            
 
         
 
                //If you don't want to allow a key to affect X, keep this line but take it out of the if
                transform.localRotation = Quaternion.AngleAxis (rotationX, Vector3.up);
          
 
        }
        else
        {
            // Read the mouse input axis
            rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
 
            // Call our Adjust to 360 degrees and clamp function
            Adjust360andClamp();
 
            // Call our look left and right function.
            KeyLookAround();
 
            // Call our look up and down function.
            KeyLookUp();
 
            // If the user isn't pressing a key to look up, transform our Y angle to the mouse
            
                // If you don't want to allow a key to affect Y, keep this line but take it out of the if
                transform.localRotation = Quaternion.AngleAxis (rotationY, Vector3.left);
            
 
        }
    }
 
    function KeyLookAround ()
    {
//      If you're not using it, you can delete this whole function. 
//      Just be sure to delete where it's called in Update.
 
      
    }
 
    function KeyLookUp ()
    {
//     
    }
 
    function Adjust360andClamp ()
    {
//      This prevents your rotation angle from going beyond 360 degrees and also 
//      clamps the angle to the min and max values set in the Inspector.
 
        // During in-editor play, the Inspector won't show your angle properly due to 
        // dealing with floating points. Uncomment this Debug line to see the angle in the console.
 
        // Debug.Log (rotationX);
 
        // Don't let our X go beyond 360 degrees + or -
        if (rotationX < -360)
        {
            rotationX += 360;
        }
        else if (rotationX > 360)
        {
            rotationX -= 360;
        }   
 
        // Don't let our Y go beyond 360 degrees + or -
        if (rotationY < -360)
        {
            rotationY += 360;
        }
        else if (rotationY > 360)
        {
            rotationY -= 360;
        }
 
        // Clamp our angles to the min and max set in the Inspector
        rotationX = Mathf.Clamp (rotationX, minimumX, maximumX);
        rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
    }
 
    function Start ()
    {
        // Make the rigid body not change rotation
        if (GetComponent.<Rigidbody>())
        {
            GetComponent.<Rigidbody>().freezeRotation = true;
        }
    }