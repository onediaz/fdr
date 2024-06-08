import { uploadData } from 'aws-amplify/storage';
import { getStudent } from './get-student';


async function getProfilePicture (studentId) {
    const student = await getStudent(studentId);
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const url = await Storage.get(note.name);
          note.image = url;
        }
        return note;
      })
    );
    setNotes(notesFromAPI);
  };

export {getProfilePicture}