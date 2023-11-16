// firebase-storage.service.ts

import {Injectable} from '@nestjs/common';
import {FirebaseStorage, getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {firebaseStorage} from '../config/firebase.config';

@Injectable()
export class FirebaseStorageService {
    private storage: FirebaseStorage = firebaseStorage;

    async uploadFile(destination: string, file: any): Promise<string | undefined> {
        try {
            const storageRef = ref(this.storage, destination);

            const metadata = {
                contentType: file.mimetype,
            };

            const snapshot = await uploadBytes(storageRef, file.buffer, metadata);

            return await getDownloadURL(snapshot.ref);
        } catch (err) {
            console.error('Something went wrong while uploading the file:', err);
            return undefined;
        }
    }
}
