import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

export function poiOptionsFactory(pois) {
  var poiOptions = new PoiOptions();

  pois.toArray().forEach((p) => {
    poiOptions.add(new PoiOption(p.id, p.name));
  });

  return poiOptions;
}

export class PoiOptions {
  constructor(PoiOptions = []) {
    this.poiOptions = PoiOptions;
  }

  add(poiOption) {
    this.poiOptions.push(poiOption);
  }

  toOptions() {
    var _options = [];
    this.poiOptions.forEach((o) => {
      _options.push(o.toOption());
    });
    return _options;
  }
}

export class PoiOption {
  constructor(id, label) {
    this.id = id;
    this.label = label;
  }

  toOption() {
    return { id: this.id, label: this.label.toString() };
  }
}

const PoiSelector = (props) => {
  const [poiOptions, setPoiOptions] = useState(new PoiOptions().toOptions());

  useEffect(() => {
    setPoiOptions(props.poiOptions.toOptions());
  }, [props]);

  const onPoiChange = (event, values) => {
    if (event.type == "click") {
      props.poiCallback(values.id);
    }
  };

  return (
    <Autocomplete
      id="poi-selector"
      disablePortal
      options={poiOptions}
      onChange={onPoiChange}
      renderInput={(params) => (
        <TextField {...params} label="Find your favourite shop" />
      )}
      //sx={{ width: "20%" }}
    />
  );
};

export default PoiSelector;
