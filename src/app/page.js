'use client'; 
// import { IKImage, IKVideo, ImageKitProvider, IKUpload, ImageKitContext } from "imagekitio-next";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import { useState } from "react";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
export default function Home() {
  const [filepath, setFilepath] = useState("");
  return (
    <div className="App">
      <button>click me</button>
      <ImageKitProvider 
      publicKey={publicKey} 
      urlEndpoint={urlEndpoint} 
      authenticator={authenticator}>
        
        <div className="relative large-dimension">
          {filepath &&
            <IKImage 
            width={400}
            height={500}
            path={filepath} 
            alt="Alt text" />
          }
        </div>

        <div>
          <h2>File upload</h2>
          <IKUpload fileName="test-upload.png" 
          onError={(error) => {console.error("Upload failed", error)}}
          onSuccess={(response) => {console.log("Upload successful", response); setFilepath(response.filePath)}}
          />
        </div>

      </ImageKitProvider>
    </div>
  );
}
