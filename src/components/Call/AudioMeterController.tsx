import React, { useEffect, useState, useRef } from "react";
interface IProps {
  source: MediaStream;
  changeAudio: () => void;
}
export const AudioMeterController = (props: IProps) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [audioData, setAudioData] = useState<Float32Array | null>(null);
  const [range, setRange] = useState<number>(1.5);
  const [gain, setGain] = useState<GainNode | null>(null);
  let canvasCtx: CanvasRenderingContext2D | null;
  let context = new AudioContext();
  let dataArray: Float32Array;
  let analyser: AnalyserNode;
  let timer: NodeJS.Timer;
  useEffect(() => {
    if (props.source.getTracks().length > 0) {
      audioController();
    }
  }, [props.source]);
  const audioController = () => {
    let source = context.createMediaStreamSource(props.source);
    let baseGain = context.createGain();
    analyser = context.createAnalyser();
    analyser.fftSize = 2048;
    let bufferLength = analyser.frequencyBinCount;
    dataArray = new Float32Array(bufferLength);
    baseGain.gain.setValueAtTime(range, context.currentTime);
    source.connect(baseGain);
    analyser.connect(context.destination);
    baseGain.connect(analyser);
    setGain(baseGain);
    canvasCtx = canvas.current!.getContext("2d");
    canvasCtx!.fillStyle = "#0bda51";
    requestAnimationFrame(draw);
  };
  const draw = () => {
    if (canvas.current) {
      analyser?.getFloatFrequencyData(dataArray);
      canvasCtx!.clearRect(0, 0, canvas.current!.width, canvas.current!.height);
      canvasCtx?.fillRect(
        0,
        0,
        canvas.current!.width + dataArray[dataArray.length - 1] / 2,
        canvas.current!.height
      );
      setAudioData(dataArray);
      requestAnimationFrame(draw);
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.currentTarget.value) === 0) props.changeAudio();
    else if (range === 0 && Number(e.target.value) > range) {
      props.changeAudio();
    }
    setRange(Number(e.currentTarget.value));
    gain!.gain.setValueAtTime(
      Number(e.currentTarget.value),
      context.currentTime
    );
  };

  return (
    <div id="audioMeters" className="flex justify-center flex-col">
      <input
        onChange={changeVolume}
        min={0}
        className="h-4"
        max={3}
        step={0.2}
        type="range"
        value={range}
      />
      <canvas ref={canvas} className="border-2 w-full h-12" id="volumeMeter" />
    </div>
  );
};
