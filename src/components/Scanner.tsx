import { IonButton, IonItem } from '@ionic/react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import './ExploreContainer.css';
import { useState } from 'react';

interface ScannerProps { }

const Scanner: React.FC<ScannerProps> = () => {
    const [code,setCode] = useState<string>();

    const startScan = async () => {
        document.querySelector('body')!.classList.add('scanner-active');
        // Check camera permission
        // This is just a simple example, check out the better checks below
        await BarcodeScanner.checkPermission({ force: true });
      
        // make background of WebView transparent
        // note: if you are using ionic this might not be enough, check below
        BarcodeScanner.hideBackground();
      
        const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
      
        // if the result has content
        if (result.hasContent) {
          console.log(result.content); // log the raw scanned content
          setCode(result.content)
        }
        document.querySelector('body')!.classList.remove('scanner-active');
      };

    return (
        <div className='container'>
            {code && <IonItem>{code}</IonItem>}
            <IonButton onClick={startScan}>Scan Barcode</IonButton>
        </div>
    )
}

export default Scanner;