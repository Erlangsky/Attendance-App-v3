import React, { useEffect, useState } from "react";
import {
    View, Text, SafeAreaView, StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// const initialHistory = [
//     { id: "1", course: "Web Programming", date: "2026-03-01", status: "Absent", room: "Lab 1", lecturer: "Bpk. Andi" },
//     { id: "2", course: "Database System", date: "2026-03-02", status: "Present", room: "Lab 2", lecturer: "Ibu Rina" },
// ];

export default function HistoryScreen({ navigation }) {
    // const [historyData] = useState(initialHistory);
    // 1. STATE UNTUK DATA & CONTROL
    const [historyData, setHistoryData] = useState([]); // Mulai dengan array kosong
    const [isLoading, setIsLoading] = useState(false);
    const [isRefeshing, setIsRefreshing] = useState(false);
    const [page, setPage] = useState(1); // Melacak halaman keberapa yang dimuat

    // 2. FUNGSI AMBIL DATA (Simulasi API)
    const fetchAttandanceData = (isInitial = false) => {
        if (isLoading) {
            return; // Mencegah pemanggilan ganda
        }
        setIsLoading(true);

        // Simulasi dekat jaringan selama 1.5 detik
        setTimeout(() => {
            const newItems = [];
            const startIdx = isInitial ? 0 : historyData.length;

            for (let i = 1; i <= 10; i++) {
                newItems.push({
                    id: (startIdx + i).toString(),
                    course: `Mata Kuliah ${startIdx + i}`,
                    date: `2026-03-14`,
                    status: i % 3 === 0 ? "Present" : "Absent",
                    room: "Lab 3",
                    lecturer: "Dosen Pengampu"
                });
            }
            // Jika initial (halaman 1),ganti data. jika tidak, gabungkan (append)
            setHistoryData(isInitial ? newItems : [...historyData, ...newItems]);
            setIsLoading(false);
            setIsRefreshing(false);
        }, 1500);
    }

    // Panggil saat layar pertama kali dibuka
    useEffect(() => {
        fetchAttandanceData(true);
    }, []);

    // 3. FUNGSI REFRESH (Tarik dari atas)
    const onRefresh = () => {
        setIsRefreshing(true);
        fetchAttandanceData(true); // Ambil data baru
    }

    // 4. FUNGSI LOAD MORE (Tarik dari bawah)
    const handleloadMore = () => {
        // Hanya muat data baru jika data sekarang sudah cukup banyak
        if (historyData.length >= 10 && !isLoading) {
            fetchAttandanceData(false);
        }
    }

    const renderItem = ({ item }) => (
        // SIHIR NAVIGASI: Pindah layar sambil melempar parameter 'item'
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Detail", { dataPresensi: item })}
        >
            <View style={{ flex: 1 }}>
                <Text style={styles.course}>{item.course}</Text>
                <Text style={styles.date}>{item.date}</Text>
            </View>
            <Text style={item.status === "Present" ? styles.present : styles.absent}>
                {item.status}
            </Text>
            <MaterialIcons name="chevron-right" size={24} color="#999" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
    );

    const renderFooter = () => {
        if (!isLoading) return null;
        return (
            <View style={styles.footer}>
                <ActivityIndicator size="small" color="#0056A0" />
                <Text style={styles.loaderText}>Memuat riwayat lama...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={historyData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.content}
                refreshing={isRefeshing}
                onRefresh={onRefresh}
                onEndReached={handleloadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                // ....................

                ListEmptyComponent={() => (
                    !isLoading && <Text style={styles.emptyText}>Tidak ada riwayat.</Text>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F5F5" },
    content: { padding: 20 },
    item: {
        flexDirection: "row", alignItems: "center", backgroundColor: "white",
        padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2
    },
    course: { fontSize: 16, fontWeight: "bold", color: "#333" },
    date: { fontSize: 12, color: "gray", marginTop: 4 },
    present: { color: "green", fontWeight: "bold" },
    absent: { color: "red", fontWeight: "bold" },
    footer: { paddingVertical: 20, alignItems: "center", flexDirection: "row", justifyContent: "center" },
    loaderText: { padding: 10, color: "#666", fontSize: 12 },
    emptyText: { textAlign: "center", marginTop: 50, color: "#999" },
});