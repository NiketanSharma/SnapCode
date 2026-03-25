import React, { useCallback, useEffect, useRef, useState } from "react";
import { FeatureGeneralBox, FeatureInnerBox } from "../styled/StyledFeature";
import html2canvas from "html2canvas";
import { toPng, toSvg, toJpeg } from "html-to-image";
import Canvas from "./Canvas";
import { useDispatch, useSelector } from "react-redux";
import { renderToStaticMarkup } from "react-dom/server";
import { ReactSVG } from "react-svg";
import { saveAs } from "file-saver";
import { useReactToPrint } from "react-to-print";
import DropdownDownload from "./Dropdownlist/DropdownDownload";
import { FormatList, WidthList } from "../constants/Constants";
import { DownloadFormatContext } from "../Context/DownloadFormatContext";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const Download = ({ sharedRef }) => {
  const [canvasFormat, setcanvasFormat] = useState(".png");
  const snippetFileName = useSelector(
    (state) => state.canvasStyle.snippetFileName,
  );
  const [downloading, setDownloading] = useState(false);
  const canvasBackGround = useSelector(
    (state) => state.canvasStyle.canvasBackGround
  );

  const onButtonClickForPng = useCallback(async () => {
    if (sharedRef.current === null) {
      return;
    }

    await toPng(sharedRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${snippetFileName.split(".")[0]}`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sharedRef, snippetFileName]);

  const onButtonClickForJpeg = useCallback(() => {
    if (sharedRef.current === null) {
      return;
    }

    toJpeg(sharedRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${snippetFileName.split(".")[0]}`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sharedRef, snippetFileName]);

  const onButtonClickForSVG = useCallback(() => {
    if (sharedRef.current === null) {
      return;
    }

    toSvg(sharedRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${snippetFileName.split(".")[0]}`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sharedRef, snippetFileName]);

  const handleFormatClick = () => {
    if (canvasFormat === ".png") {
      onButtonClickForPng();
    } else if (canvasFormat === ".svg") {
      onButtonClickForSVG();
    } else if (canvasFormat === ".jpeg") {
      onButtonClickForJpeg();
    }
  };

  return (
    <>
      {/* <div ref={ref}>
            <Canvas/>
        </div> */}
      <DownloadFormatContext.Provider value={{ canvasFormat, setcanvasFormat }}>
        <div className="cursor-pointer flex">
          <FeatureInnerBox withOfBox="100%" heightOfBox="52px">
            <span className="mr-3 opacity-60 font-mono text-[10px] uppercase">Format</span>
            <DropdownDownload placeHolder="PNG" options={FormatList} />
          </FeatureInnerBox>
        </div>
      </DownloadFormatContext.Provider>

      <div
        className="cursor-pointer mt-2"
        onClick={() => {
          handleFormatClick();
          confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: -0.2 },
            colors: ['#4F46E5', '#3B82F6', '#60A5FA']
          });
        }}
      >
        <FeatureInnerBox
          className="flex text-center justify-center items-center transition-all duration-300 relative group cursor-pointer"
          withOfBox="100%"
          heightOfBox="56px"
        >
          <div className="relative z-10 w-full flex justify-center items-center font-mono text-[13px] font-bold tracking-wide group-hover:text-white transition-colors">
            Export
          </div>
        </FeatureInnerBox>
      </div>

    </>
  );
};

export default Download;
