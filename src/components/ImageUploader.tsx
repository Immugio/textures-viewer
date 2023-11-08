import { ChangeEvent } from "react";
import { ImageInputs, imageInputs } from "./imageUtils";
import { ImageState } from "./common";

interface ImageUploaderProps {
    images: ImageState;
    setImages: React.Dispatch<React.SetStateAction<ImageState>>;
}

export function ImageUploader({ images, setImages }: ImageUploaderProps) {
    const loadImage = async (
        e: ChangeEvent<HTMLInputElement>,
        key: keyof ImageState
    ) => {
        if (e?.target?.files?.[0]) {
            const data = URL.createObjectURL(e.target.files[0]);
            const image = document.createElement("img");

            image.onload = () => {
                setImages((prevImages) => ({ ...prevImages, [key]: image }));
            };

            image.src = data;
        }
    };

    const removeImage = (key: keyof ImageState) => {
        setImages((prevImages) => ({ ...prevImages, [key]: null }));
    };

    return (
        <div className="files">
            {imageInputs.map((input: ImageInputs) => (
                <div key={input.key}>
                    <p>{input.label}</p>
                    {images[input.key] ? (
                        <div className="image-container">
                            <button
                                className="remove-button"
                                onClick={() => removeImage(input.key)}
                            >
                                X
                            </button>
                            <img
                                width={100}
                                height={100}
                                src={(images[input.key] as HTMLImageElement).src}
                                alt={input.label}
                            />
                        </div>
                    ) : (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => loadImage(e, input.key)}
                        />
                    )}
                </div>
            ))}
            <div>
                <p>Environment Map:</p>
                <select onChange={(e) => setImages({ ...images, environmentImage: e.target.value })}>
                    <option value="">Select</option>
                    <option value="ocean.hdr">Ocean</option>
                    <option value="sunset.hdr">Sunset</option>
                    <option value="night.hdr">Night</option>
                    <option value="trees.hdr">Trees</option>
                    <option value="warehouse.hdr">Warehouse</option>
                    <option value="forest.hdr">Forest</option>
                    <option value="apartment.hdr">Apartment</option>
                    <option value="studio.hdr">Studio</option>
                    <option value="park.hdr">Park</option>
                    <option value="lobby.hdr">Lobby</option>
                    <option value="city.hdr">City</option>
                </select>
            </div>
        </div>
    );
}
