import { useAuth } from "../../store/auth";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlinePlayCircleOutline } from "react-icons/md";

function BrochureAndVideo({ brochureFile, videoLink }) {
  const { URI, setVideoURL, setShowPlayVideo } = useAuth();

  return (
    <div className={`flex gap-[8px] items-center justidy-center`}>
      <div
        onClick={() => {
          //window.open(URI + property?.videoFile, "_blank");
          setVideoURL(videoLink);
          setShowPlayVideo(true);
        }}
        className={`${
          videoLink ? "block" : "hidden"
        } relative overflow-hidden p-[5px] z-10 text-white bg-[#107c0b] rounded-lg cursor-pointer`}
      >
        <div className="overflow-hidden relative z-10 flex items-center justify-center animate-blink">
          <MdOutlinePlayCircleOutline className="w-5 h-5" />
          <span className="absolute shine-layer"></span>
        </div>
      </div>
      <div
        onClick={() => {
          const link = document.createElement("a");
          link.href = URI + brochureFile;
          link.download = brochureFile.split("/").pop();
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
        className={`${
          brochureFile ? "block" : "hidden"
        } p-[5px] text-white bg-[#107c0b] rounded-lg cursor-pointer relative overflow-hidden`}
      >
        <div className="overflow-hidden relative z-10 flex items-center justify-center animate-blink">
          <MdOutlineFileDownload className="w-5 h-5" />
          <span className="absolute shine-layer"></span>
        </div>
      </div>
    </div>
  );
}

export default BrochureAndVideo;
