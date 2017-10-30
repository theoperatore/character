import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.REACT_APP_FIREBASE_API_KEY = 'testFBApiKey';
global.REACT_APP_FIREBASE_AUTH_DOMAIN = 'testFBAuthDomain';
global.REACT_APP_FIREBASE_DATABASE_URL = 'testFBDatabaseURL';
global.REACT_APP_FIREBASE_STORAGE_BUCKET = 'testFBStorageBucket';
global.REACT_APP_FIREBASE_PROJECT_ID = 'testProjectId';
global.REACT_APP_FIREBASE_MESSAGING_SENDER_ID = 'testMessagingSenderId';
