import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database'

const appSettings = {
  databaseUrl: 'https://ai-workout-generator-default-rtdb.europe-west1.firebasedatabase.app/'
}

const app = initializeApp(appSettings);

const database = getDatabase(app);

const conversationInDb = ref(database);