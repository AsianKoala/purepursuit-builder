# purepursuit-builder

Generates pure pursuit paths for FTC from an embedded Desmos graph. Uses NodeJS and the Desmos API.  

## Usage  
1. Clone the repo  
```
git clone git@github.com:AsianKoala/purepursuit-builder.git
cd purepursuit-builder/
```
2. Install dependencies
```
npm install
```

3. Start the server
```
npm start
```

4. Input your waypoint values into the table
5. Type in final angle (degrees), or leave blank to automatically calculate it based on the 2 last waypoints
6. Hit generate and the Kotlin code will show up at the bottom of the page.
