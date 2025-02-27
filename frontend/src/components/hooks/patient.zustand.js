import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the initial patient data structure
const initialState = {
    selectedPatient: {
        name: "Default Patient",
        DOB: "2-34-2224",
        image: "assets/images/team/team-1.jpg",
        email: "default@gmail.com",
        publicAddress: "0x7BEb7983B03e75B4b7F62E2B13256Aec92C223Fa",
        contact: "0000000000",
        gender: "Male",
        aadhar: "XXXXXXXXXXXXXX",
    }
};

// Create the Zustand store for patient management with persistence
const usePatients = create(
    persist(
        (set) => ({
            ...initialState,

            // Add a new patient (persists after reload)
            addPatient: (patient) =>
                set(() => ({ selectedPatient: patient })),

            // Remove a patient (resets to default)
            removePatient: () =>
                set(() => ({ selectedPatient: initialState.selectedPatient })),

            // Set a new patient in the state (temporary storage)
            setNewPatient: (patient) =>
                set(() => ({ selectedPatient: patient })),
        }),
        {
            name: 'patient-store', // Key for localStorage
        }
    )
);

export default usePatients;
