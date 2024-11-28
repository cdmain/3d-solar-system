---

# **3D Solar System Simulation - Documentation**

## **Overview**
The Solar System Simulation is an interactive 3D model built using Three.js. It allows users to visualize the orbits and rotations of planets around the Sun and provides a simple user interface to control various aspects of the simulation, such as adjusting the speed of orbits, selecting a planet to focus on, and locking the camera to follow a specific planet.

## **Features**
### **1. Planetary Orbits and Rotations**
- **Orbiting Planets**: Each planet orbits the Sun at a different speed and radius, simulating the motion of planets in the solar system.
- **Rotating Planets**: Planets rotate around their axes at varying speeds, creating a realistic spinning effect.

### **2. Camera Controls**
- **Free Camera Movement**: Users can pan, zoom, and rotate the camera view using mouse interactions. This is enabled by the Three.js `OrbitControls`.
- **Focus on a Planet**: Users can select a planet from the dropdown menu, and the camera will automatically lock onto the selected planet and follow its orbit around the Sun.
- **Camera Follow Mode**: When focused on a planet, the camera moves at the same speed and along the same orbital path as the planet, providing a close-up view as the planet travels through its orbit.

### **3. User Interface**
- **Orbit Speed Control**: A slider allows users to adjust the speed at which all planets orbit the Sun. Increasing the slider value accelerates the orbits, while decreasing it slows them down.
- **Rotation Speed Control**: A slider allows users to control the speed at which planets rotate around their axes. Users can slow down or speed up the rotational speed using this control.
- **Planet Focus Selection**: A dropdown menu lists all planets in the simulation. By selecting a planet from the menu, the camera locks onto that planet and follows its movement.

## **How to Interact with the Simulation**

### **1. Camera Movement**
- **Zoom In/Out**: Scroll the mouse wheel up or down to zoom in or out.
- **Pan**: Hold the right mouse button and drag to pan the camera view.

### **2. Adjusting Simulation Parameters**
- **Orbit Speed**: Use the orbit speed slider in the UI to control how fast planets orbit the Sun. A higher value increases the speed, while a lower value slows it down.
- **Rotation Speed**: Use the rotation speed slider to control how fast planets rotate around their axes. Adjusting this slider will make the spinning of the planets faster or slower.

### **3. Focusing on a Planet**
- **Select a Planet**: Use the dropdown menu labeled "Focus on Planet" to choose a planet you wish to follow. Once selected, the camera will automatically adjust to follow the chosen planet as it orbits the Sun.
- **Camera Follow Mode**: After selecting a planet, the camera will move in sync with the planet's orbit, giving the appearance that the camera is "attached" to the planet.

### **4. Resetting Camera View**
- To reset the camera to its default position or to regain free movement after focusing on a planet, simply select "none" from the "Focus on Planet" dropdown menu.

## **Technical Notes**
- **Three.js**: This simulation is built using Three.js, a powerful 3D library that enables the creation of 3D graphics within the browser.
- **OrbitControls**: The camera movement and interaction are managed by the OrbitControls feature from Three.js, allowing intuitive control over the viewing perspective.

---