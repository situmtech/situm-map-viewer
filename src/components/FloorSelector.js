import React from "react";
import { useState, useEffect } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Floor } from "../domain/models";
import { PoiOptions } from "./PoiSelector";


export function floorOptionsFactory(floors){
    var floorOptions = new FloorOptions()
  
    floors.toArray().forEach(f=>{
        floorOptions.add(new FloorOption(f.id, f.level))
    })
    return floorOptions
}

export class FloorOptions{
    constructor(floorOptions=[]){
        this.floorOptions = floorOptions
    }

    add(floorOption){
        this.floorOptions.push(floorOption)
    }

    toOptions(){
        var _options = []
        this.floorOptions.forEach(o=>{
                _options.push(o.toOption())
            }
        )
        return _options
    }
}

export class FloorOption{
    constructor(id, label){
        this.id = id
        this.label = label
    }

    toOption(){
        return {"id": this.id, "label": this.label.toString()}
    }
}

const FloorSelector = (props) => {
    const [floorOptions, setFloorOptions] = useState(new FloorOptions().toOptions())
    

    useEffect(() => {

        setFloorOptions(props.floorOptions.toOptions())
        
      }, [props]);


    const onFloorChange = (event, values)=>{

        if (event.type=="click"){
          props.floorCallback(values.id)
          
        }
      
    }
    
    return  <Autocomplete
    disablePortal
    id="floor-selector"
    options={floorOptions}
    onChange={onFloorChange}
    renderInput={(params) => <TextField {...params} label="Go to floor..." />}
    sx={{width: '100%', position: "absolute", bottom:0, left:0}}
  />;
  
};

export default FloorSelector;