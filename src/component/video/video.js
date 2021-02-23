import React from "react";
import './video.css';

function Video ({Info}) {
    const {id, snippet} = Info;
    const source = `https://www.youtube.com/embed/${id.videoId}`
    return (
        <div className="content_wrapper">
            <div className="video_wr">
                <iframe src={source} frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                </iframe>
            </div>

            <div className="desc_wr">
                <h3 className="video_title">{snippet.title}</h3>
                <span className="desc-video channel">{snippet.channelTitle}</span>
            </div>
        </div>
    )
}

export default Video;
