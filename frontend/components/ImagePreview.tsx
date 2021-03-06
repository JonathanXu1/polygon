import Image from "next/image";
import languages from "../constants/languages.json";
import styled from "styled-components";

export function ImagePreview({ video }) {
  return (
    <div className="h-100 w-100" style={{ position: "relative" }}>
      <Image
        width={500}
        height={300}
        className="rounded-md mx-1 object-cover shadow-sm "
        src={video.thumbnail_url ?? "/default-video-thumbnail.jpg"}
        alt="Thumbnail"
      />
      {video.language &&
        Object.keys(languages).some((lang) => lang === video.language) && (
          <GreyPill
            style={{
              position: "absolute",
              bottom: 10,
              left: 7,
            }}
          >
            {
              Object.keys(languages).filter(
                (lang) => lang === video.language
              )[0]
            }
          </GreyPill>
        )}
      {video.duration ? (
        <GreyPill style={{ position: "absolute", bottom: 10, right: 7 }}>
          {new Date(video.duration * 1000).toISOString().substr(11, 8)}
        </GreyPill>
      ) : null}
    </div>
  );
}
export const GreyPill = styled.div`
  background-color: rgba(40, 40, 40, 0.8);
  color: white;
  border-radius: 3px;
  font-size: 11px;
  padding: 2px 6px;
`;
