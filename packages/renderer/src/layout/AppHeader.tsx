import useElectron from "@/hooks/electron";
import { selectAppStore } from "@/store";
import { cn } from "@/utils";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { HelpIcon, PrivacyIcon } from "@/assets/svg";
import LogoImg from "../assets/images/logo.png";
import { ThemeContext } from "@/context/ThemeContext";

interface Props {
  className?: string;
}

export function AppHeader({ className }: Props) {
  const { openUrl } = useElectron();
  const { t } = useTranslation();
  const appStore = useSelector(selectAppStore);
  const theme = useContext(ThemeContext);

  const openHelpUrl = () => {
    const url = "https://downloader.caorushizi.cn/guides.html?form=client";
    openUrl(url);
  };

  return (
    <div
      className={cn(
        "flex h-16 w-full select-none flex-row justify-between bg-[#F9FBFC] dark:bg-[#1F2024]",
        className,
      )}
    >
      <div className="h-full rounded-br-full bg-[#EBF3FB] pr-2 dark:bg-[#3B3C41]">
        <div className="relative flex h-full min-w-[299px] flex-row items-center rounded-br-full bg-[#fff] pl-3 pr-2 dark:bg-[#2C2E33]">
          <img className="m-3 h-8 w-8" src={LogoImg} alt="" />
          <span className="text-lg dark:text-white">Media Go</span>
          <span className="ml-[30px] block text-sm text-[#666] dark:text-white">
            v{import.meta.env.APP_VERSION}
          </span>
          <div className="absolute bottom-0 h-[1px] w-[136px] bg-[#EFF7FF] dark:bg-[#606167]" />
          <div className="absolute bottom-0 h-[2px] w-[45px] bg-[#127AF3]" />
        </div>
      </div>
      {/* help */}
      <div className="flex flex-row items-center gap-3 pr-3">
        {appStore.privacy && (
          <div className="flex flex-row items-center gap-1 gap-3 text-sm text-gray-600 dark:text-white">
            <PrivacyIcon
              height={15}
              width={15}
              fill={theme === "light" ? "black" : "white"}
            />
            隐私模式
          </div>
        )}
        <div
          className="cursor-pointer rounded-full rounded-br-sm bg-white p-1 dark:bg-[#43454B]"
          onClick={openHelpUrl}
        >
          <div className="flex flex-row items-center gap-2 rounded-full rounded-br-sm bg-[#F9FBFC] p-2 dark:bg-[#2F3035]">
            <HelpIcon />
            <span className="text-xs text-[#137BF4] dark:text-white">
              {t("help")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}