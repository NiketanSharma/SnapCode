import React, { useEffect, useState, useContext } from "react";
import MainLogo from "../assets/Frame 1.png";
import { AiFillGithub } from "react-icons/ai";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useSelector } from "react-redux";
import { TbSourceCode } from "react-icons/tb";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { VisibleContext } from "../Context/VisibleContext";

const Navbar = () => {
  const { visiblity, setvisiblity } = useContext(VisibleContext);
  const [gitLogo, setgitLogo] = React.useState(false);
  const canvasBackGround = useSelector(
    (state) => state.canvasStyle.canvasBackGround
  );
  const [mainLogo, setmainLogo] = useState(false);
  const history = useNavigate();
  useEffect(() => { }, [canvasBackGround, mainLogo]);

  return (
    <div className="flex justify-center items-center select-none z-50 relative">
      <div className="fixed top-6 left-8 flex items-center glass-effect px-4 py-2 rounded-full cursor-pointer hover:bg-white/10 transition-all duration-300">
        <TbSourceCode
          className="text-[#6B5ED9]"
          style={{
            height: "28px",
            width: "28px",
          }}
        />
        <p
          className="text-[18px] ml-2 font-bold tracking-tight text-white"
          style={{ fontFamily: "Inter" }}
        >
          SnapCode
        </p>
      </div>

      <div className="fixed top-6 right-8 flex gap-4">
        {/* Visibility Toggle */}
        <div
          onClick={() => setvisiblity(!visiblity)}
          className="glass-effect p-2 rounded-full hover:bg-white/10 transition-all duration-300 cursor-pointer flex justify-center items-center"
        >
          {visiblity ? (
            <MdOutlineVisibility
              className="text-white hover:text-[#6B5ED9] transition-colors"
              style={{ height: "28px", width: "28px" }}
            />
          ) : (
            <MdOutlineVisibilityOff
              className="text-white hover:text-[#6B5ED9] transition-colors"
              style={{ height: "28px", width: "28px" }}
            />
          )}
        </div>

        {/* Github Link */}
        <div className="glass-effect p-2 rounded-full hover:bg-white/10 transition-all duration-300">
          <NavLink to="https://github.com/NiketanSharma/SnapCode">
            <AiFillGithub
              className="text-white hover:text-[#6B5ED9] transition-colors"
              style={{
                height: "28px",
                width: "28px",
              }}
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
