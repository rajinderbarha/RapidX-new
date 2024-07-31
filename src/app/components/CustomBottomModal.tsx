import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import BottomModalContent from "./BottomModalContent";

interface BottomModalProps {
  onChange: (index: number) => void;
  isFocused: boolean;
}

export default function CustomBottomModal({ onChange, isFocused }: BottomModalProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["15%", "60%", "99%"], []);

  const openModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
    bottomSheetModalRef.current?.snapToIndex(0);
  }, []);

  useEffect(() => {
    if (isFocused) {
      openModal();
    }
  }, [isFocused, openModal]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      onChange={onChange}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}
      style={styles.modal}
    >
      <BottomSheetView style={styles.contentContainer}>
        <BottomModalContent />
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#f1f1f1",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 10,
    borderColor: "#ffffff",
  },
  handleIndicator: {
    backgroundColor: "#a3a3a3",
    width: 50,
    height: 5,
    borderRadius: 2.5,
  },
  modal: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
