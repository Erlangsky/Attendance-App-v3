import React, { useState, useEffect, useMemo, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, SafeAreaView, Alert, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


// Data awal ( Intial State )
const initialHistory = [
    { id: 1, course: "Mobile Programming", date: "2026-03-01", status: "Present" },
    { id: 2, course: "Database Systems", date: "2026-03-02", status: "Present" },
];

const Home = () => {
    // 2. STATE UNTUK STATUS TOMBOL CHECK-IN
    const [isCheckedIn, setisCheckedIn] = useState(false);
    // 3. STATE UNTUK JAM DIGITAL
    const [currentTime, setCurrentTime] = useState(`Memuat jam...`);
    // 4. STATE & REF UNTUK CATATAN (BARU)
    const [note, setNote] = useState("");
    const noteInputRef = useRef(""); // Membuat "kait" kosong untuk UI
    // 5. OPTIMASI KOMPUTASI DENGAN useMemo
    const attendancceStats = useMemo(() => {
        return { totalPresent: 12, totalAbsent: 2 };
    }, []);

    // EFEK SIKLUS HIDUP (Mounting & Unmounting)
    useEffect(() => {

        // Jalankan timer setiap 1000 milidetik (1 detik
        const timer = setInterval(() => {
            const timeString = new Date().toLocaleTimeString('id-ID',
                { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            setCurrentTime(timeString);
        }, 1000);

        // CLEANUP: matikan timer jika layar di tutup
        return () => clearInterval(timer);
    }, []); // Array kosong []] artinya jalankan hanya satu kali saat awal dibuka

    // FUNGSI LOGIKA ABSEN
    const handleCheckIn = () => {
        if (isCheckedIn) {
            Alert.alert("Perhatian", "Anda sudah melakukan check-in untuk kelas ini.");
            return;
        }

        // Validasi catatan menggunakan useref
        if (note.trim() === "") {
            Alert.alert("Perhatian", "Catatan kehadiran wajib di isi.");
            noteInputRef.current.focus(); // <-- Sihir useRef: Memaksa kursor pindah ke input
            return;
        }

        // 3. Kunci tombol Check in
        setisCheckedIn(true);
        Alert.alert("Sukses", `Berhasil Check in pada pukul ${currentTime}.`);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>Attendance App</Text>
                    {/* Tampilkan State Jam Digital */}
                    <Text style={styles.clockText}>{currentTime}</Text>
                </View>

                {/* Student Card */}
                <View style={styles.card}>
                    <View style={styles.icon}>
                        <MaterialIcons name="person" size={40} color="#555" />
                    </View>

                    <View>
                        <Text style={styles.name}>Budi Santoso</Text>
                        <Text>NIM : 0325260031</Text>
                        <Text>Class : Informatika-2B</Text>
                    </View>
                </View>

                {/* Today`s class */}
                <View style={styles.classCard}>
                    <Text style={styles.subtitle}>Today's Class</Text>
                    <Text>Mobile Programming</Text>
                    <Text>08:00 AM - 10:00 AM</Text>
                    <Text>Lab 3</Text>

                    {/* Fitur Baru: Kolom input catatan dengan useRef */}
                    {!isCheckedIn && (
                        <TextInput
                            ref={noteInputRef} // <-- Menempelkan referensi ke elemen ini
                            style={styles.inputCatatan}
                            placeholder="Tulis catatan (cth: Hadir lab)"
                            value={note}
                            onChangeText={setNote}
                        />
                    )}

                    {/* Modifikasi Tombol Check-in */}
                    <TouchableOpacity
                        style={[styles.button, isCheckedIn ? styles.buttonDisabled : styles.buttonActive]}
                        onPress={handleCheckIn}
                        disabled={isCheckedIn}>
                        <Text style={styles.buttonText}>
                            {isCheckedIn ? "CHECKED IN" : "CHECK IN"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Fitur baru : Statistik kehadiran (Hasil useMemo) */}
                <View style={styles.stateCard}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{attendancceStats.totalPresent}</Text>
                        <Text style={styles.statLabel}>Total Present </Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={[styles.statNumber, { color: "red" }]}>{attendancceStats.totalAbsent}</Text>
                        <Text style={styles.statLabel}>Total Absent</Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};


// const AttendanceData = [
//   { id: 1, course: "Mobile Programming", date: "2026-03-01", status: "Present" },
//   { id: 2, course: "Database Systems", date: "2026-03-02", status: "Present" },
//   { id: 3, course: "Operating Systems", date: "2026-03-03", status: "Absent" },
//   { id: 4, course: "Computer Networks", date: "2026-03-04", status: "Present" },
//   { id: 5, course: "Software Engineering", date: "2026-03-05", status: "Present" },
//   { id: 6, course: "Data Structures", date: "2026-03-06", status: "Absent" },
//   { id: 7, course: "Algorithms", date: "2026-03-07", status: "Present" },
//   { id: 8, course: "Artificial Intelligence", date: "2026-03-08", status: "Present" },
//   { id: 9, course: "Cloud Computing", date: "2026-03-09", status: "Present" },
//   { id: 10, course: "Cyber Security", date: "2026-03-10", status: "Present" },
//   { id: 11, course: "Web Development", date: "2026-03-11", status: "Present" },
//   { id: 12, course: "Human-Computer Interaction", date: "2026-03-12", status: "Absent" },
//   { id: 13, course: "Discrete Mathematics", date: "2026-03-13", status: "Present" },
//   { id: 14, course: "Machine Learning", date: "2026-03-14", status: "Present" },
//   { id: 15, course: "Digital Logic", date: "2026-03-15", status: "Present" },
//   { id: 16, course: "Compilers", date: "2026-03-16", status: "Absent" },
//   { id: 17, course: "Mobile Programming", date: "2026-03-17", status: "Present" },
//   { id: 18, course: "Database Systems", date: "2026-03-18", status: "Present" },
//   { id: 19, course: "Operating Systems", date: "2026-03-19", status: "Present" },
//   { id: 20, course: "Computer Networks", date: "2026-03-20", status: "Present" },
// ]

export default Home;

const styles = StyleSheet.create({
    inputCatatan: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginTop: 15,
        backgroundColor: "#fafafa",
    },
    stateCard: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    statBox: {
        alignItems: "center",
    },
    statNumber: {
        fontSize: 24,
        fontWeight: "bold",
        color: "green",
    },
    statLabel: {
        fontSize: 14,
        color: "gray",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    clockText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#007AFF",
        fontVariant: ["tabular-nums"],
    },
    buttonActive: {
        backgroundColor: "#007AFF",
    },
    buttonDisabled: {
        backgroundColor: "#A0C4FF",
    },

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
    },

    card: {
        flexDirection: "row",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },

    icon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#eee",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
    },

    name: {
        fontSize: 18,
        fontWeight: "bold",
    },

    classCard: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },

    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },

    button: {
        marginTop: 15,
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },

    buttonText: {
        color: "white",
    },

    content: {
        padding: 20,
        paddingBottom: 40,
    },

    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },

    couse: {
        fontSize: 16,
    },

    date: {
        fontSize: 12,
        color: "gray",
    },

    present: {
        color: "green",
        fontWeight: "bold",
    },

    absent: {
        color: "red",
        fontWeight: "bold",
    },

    status: {
        flexDirection: "row",
        alignItems: "center",
    },
});