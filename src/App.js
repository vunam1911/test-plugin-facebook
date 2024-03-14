import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { createRef, useRef, useState } from "react";
import { Data } from "./utils/Data";
import Piechart from "./components/Piechart";
import CryptoJS from "crypto-js";
import { saveAs } from "file-saver";
import * as htmlToImage from "html-to-image";
import { SketchPicker } from "react-color";
import Cookies from "js-cookie";
import { Cropper } from "react-cropper";
import { useTranslation } from "react-i18next";
import { InputLabel, MenuItem, Select, FormControl, Box } from "@mui/material";
import { locales } from "./locales/i18n";

Chart.register(CategoryScale);

const defaultSrc =
    "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export default function App() {
    // i18next
    const { t, i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language);
    const handleChangeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
        setCurrentLang(event.target.value);
    }

    // React Crop
    const [image, setImage] = useState(defaultSrc);
    const [cropData, setCropData] = useState("#");
    const cropperRef = createRef();

    const handleCropChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            setCropData(
                cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
            );
        }
    };

    // chuỗi cần mã hoá
    const message = "Hello, world!";
    // tính toán mã hash SHA-256
    const hash = CryptoJS.SHA256(message).toString();
    const dataToSign = {
        /* Dữ liệu cần ký */
        name: "Vu Hai Nam",
    };
    const privateKey = "mySecretKey";
    const hash2 = CryptoJS.SHA256(JSON.stringify(dataToSign)).toString();
    const signature = CryptoJS.HmacSHA256(hash, privateKey).toString();

    // Tạo và tải xuống tệp bằng cách dùng file-saver
    // // Tạo dữ liệu văn bản
    // const textData = "Hello, world!";
    // // Tạo Blob từ dữ liệu văn bản
    // const blob = new Blob([textData], { type: "text/plain;charset=utf-8" });
    // // Tải xuống tệp
    // saveAs(blob, "myTextFile.txt");

    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained ",
                data: Data.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "&quot;#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    });

    // HTML-TO-IMAGE
    const handleClickDownload = () => {
        const node = document.getElementById("chart");
        if (node) {
            htmlToImage
                .toPng(node)
                .then(function (dataUrl) {
                    var img = new Image();
                    img.src = dataUrl;
                    document.getElementById("append-image").appendChild(img);
                })
                .catch(function (error) {
                    console.error("oops, something went wrong!", error);
                });
        }
    };

    // Cookies
    Cookies.set("name", "Vu Hai Nam");
    Cookies.set("test-expires", "hehehe", { expires: 0.1, path: "" });

    return (
        <div className="App">
            <div className="flex w-full">
                <div className="flex flex-1" id="chart">
                    <div className="w-1/2">
                        <Piechart chartData={chartData} />
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <Box sx={{ width: 120 }} className="my-4">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Language
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={currentLang}
                                label="Language"
                                // InputLabelProps={{ shrink: false }}
                                onChange={handleChangeLanguage}
                            >
                                <MenuItem value={"vi"}>Tiếng Việt</MenuItem>
                                <MenuItem value={"en"}>English</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <div>
                        <p>Original message: {message}</p>
                        <p>SHA-256 hash: {hash}</p>
                    </div>
                    <hr />

                    <div>
                        <p>signature: {signature}</p>
                        <p>SHA-256 hash2: {hash2}</p>
                    </div>

                    <div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="button"
                            onClick={handleClickDownload}
                        >
                            {t("army")}
                        </button>
                    </div>

                    <div id="append-image"></div>

                    <div className="mt-8">
                        <SketchPicker />
                    </div>
                </div>
            </div>

            <div className="w-full mt-8">
                {/* React Crop */}
                {/* <div>
                    <div style={{ width: "100%" }}>
                        <input type="file" onChange={handleCropChange} />
                        <button>Use default img</button>
                        <br />
                        <br />
                        <Cropper
                            ref={cropperRef}
                            style={{ height: 400, width: "100%" }}
                            zoomTo={0.5}
                            initialAspectRatio={1}
                            preview=".img-preview"
                            src={image}
                            viewMode={1}
                            minCropBoxHeight={10}
                            minCropBoxWidth={10}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                            guides={true}
                        />
                    </div>
                    <div>
                        <div
                            className="box"
                            style={{ width: "50%", float: "right" }}
                        >
                            <h1>Preview</h1>
                            <div
                                className="img-preview"
                                style={{
                                    width: "100%",
                                    float: "left",
                                    height: "300px",
                                }}
                            />
                        </div>
                        <div
                            className="box"
                            style={{
                                width: "50%",
                                float: "right",
                                height: "300px",
                            }}
                        >
                            <h1>
                                <span>Crop</span>
                                <button
                                    style={{ float: "right" }}
                                    onClick={getCropData}
                                >
                                    Crop Image
                                </button>
                            </h1>
                            <img
                                style={{ width: "100%" }}
                                src={cropData}
                                alt="cropped"
                            />
                        </div>
                    </div>
                    <br style={{ clear: "both" }} />
                </div> */}
            </div>
        </div>
    );
}