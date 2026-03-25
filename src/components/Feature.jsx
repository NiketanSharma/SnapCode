import React, { useContext, useState } from "react";
import {
  FontFamilyList,
  PaddingList,
  ProgrammingLanguages,
  ThemeList,
  WidthList,
} from "../constants/Constants";
import Dropdown from "./Dropdownlist/Dropdown";
import DropdownLanguage from "./Dropdownlist/DropdownLanguage";
import DropdownPadding from "./Dropdownlist/DropdownPadding";
import DropdownWidth from "./Dropdownlist/DropdownWidth";
import {
  FeatureInnerBox,
  FeatureOuterBox,
} from "../styled/StyledFeature";
import SolidColour from "./SolidColour";
import GradientColour from "./GradientColour";
import ColourType from "./ColourType";
import { ColourTypeContext } from "../Context/ColourType";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import { useDispatch } from "react-redux";
import { changesnippetMode } from "../redux/CanvasConfigSlice";
import Download from "./Download";
import { VisibleContext } from "../Context/VisibleContext";
import DropdownTheme from "./Dropdownlist/DropdownTheme";

import { motion } from "framer-motion";

const Feature = ({ sharedRef }) => {
  const dispatch = useDispatch();
  const [colourType, setcolourType] = useState("solid");
  return (
    <>
      <div className="w-full flex justify-center">
        <FeatureOuterBox>
          <div className="flex flex-col gap-2 w-full">
            {/* Top Row: General Settings */}
            <div className="flex gap-2 w-full">
              <FeatureInnerBox withOfBox="30%" heightOfBox="52px">
                <span className="mr-3 opacity-60 font-mono text-[10px] uppercase">Font</span>
                <Dropdown placeHolder="Select..." options={FontFamilyList} />
              </FeatureInnerBox>
              <FeatureInnerBox withOfBox="25%" heightOfBox="52px">
                <span className="mr-3 opacity-60 font-mono text-[10px] uppercase">Padding</span>
                <DropdownPadding placeHolder="30" options={PaddingList} />
              </FeatureInnerBox>
              <FeatureInnerBox withOfBox="30%" heightOfBox="52px">
                <span className="mr-3 opacity-60 font-mono text-[10px] uppercase">Language</span>
                <DropdownLanguage placeHolder="JS" options={ProgrammingLanguages} />
              </FeatureInnerBox>
              <FeatureInnerBox withOfBox="15%" heightOfBox="52px">
                <span className="mr-3 opacity-60 font-mono text-[10px] uppercase">Dark</span>
                <ToggleSwitch toggled={true} onClick={(state) => {
                  state === true ? dispatch(changesnippetMode("dark")) : dispatch(changesnippetMode("light"));
                }} />
              </FeatureInnerBox>
            </div>

            {/* Main Body: Left (Background/Gradient) and Right (UI/Export) */}
            <div className="flex gap-2 w-full">
              {/* Left Column: Background Controls */}
              <div className="flex flex-col gap-2 w-[70%]">
                <ColourTypeContext.Provider value={{ colourType, setcolourType }}>
                  <FeatureInnerBox heightOfBox="52px" withOfBox="100%">
                    <span className="mr-8 opacity-60 font-mono text-[10px] uppercase">Background</span>
                    <ColourType />
                  </FeatureInnerBox>
                </ColourTypeContext.Provider>
                
                <ColourTypeContext.Provider value={{ colourType, setcolourType }}>
                  <FeatureInnerBox heightOfBox="175px" withOfBox="100%" className="!items-start !justify-start p-2">
                    <div className="w-full scale-95 origin-top">
                      {colourType === "solid" ? (
                        <div className="w-full flex justify-center py-2">
                          <SolidColour />
                        </div>
                      ) : (
                        <div className="w-full">
                           <GradientColour />
                        </div>
                      )}
                    </div>
                  </FeatureInnerBox>
                </ColourTypeContext.Provider>
              </div>

              {/* Right Column: Secondary Controls & Export */}
              <div className="flex flex-col gap-2 w-[30%]">
                <FeatureInnerBox heightOfBox="52px" withOfBox="100%">
                  <span className="mr-3 opacity-60 font-mono text-[10px] uppercase">Theme UI</span>
                  <DropdownTheme placeHolder="Atom dark" options={ThemeList} />
                </FeatureInnerBox>
                <FeatureInnerBox heightOfBox="52px" withOfBox="100%">
                  <span className="mr-3 opacity-60 font-mono text-[10px] uppercase">Width</span>
                  <DropdownWidth placeHolder="800" options={WidthList} />
                </FeatureInnerBox>
                {/* Redundant Format dropdown removed, Download component handles it */}
               <div className="w-full flex-grow flex flex-col justify-end">
                   <Download sharedRef={sharedRef} />
                </div>
              </div>
            </div>
          </div>
        </FeatureOuterBox>
      </div>
    </>
  );
};

export default Feature;
