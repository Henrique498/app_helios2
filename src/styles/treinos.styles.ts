import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E17',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  header: {
    marginBottom: 20,
  },
  iconTop: {
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 38,
    marginBottom: 10,
  },
  titleHighlight: {
    color: '#F5B800',
  },
  subtitle: {
    fontSize: 13,
    color: '#9BA3B4',
    lineHeight: 19,
  },
  daysRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  dayTab: {
    backgroundColor: '#161F30',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  dayTabActive: {
    backgroundColor: '#F5B800',
  },
  dayTabText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  dayTabTextActive: {
    color: '#0A0E17',
  },
  card: {
    backgroundColor: '#131B26',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1F2A3A',
    overflow: 'hidden',
    paddingBottom: 24,
  },
  cardHeader: {
    backgroundColor: '#F5B800',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
  },
  cardHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0A0E17',
  },
  exerciseList: {
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E2836',
  },
  dragIcon: {
    marginRight: 8,
  },
  numberBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1E2836',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  numberText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3,
  },
  exerciseMeta: {
    color: '#8E96A4',
    fontSize: 12,
  },
  emptyText: {
    color: '#8E96A4',
    textAlign: 'center',
    paddingVertical: 24,
    fontSize: 13,
  },
  addButton: {
    alignSelf: 'center',
    marginTop: 22,
    borderWidth: 1,
    borderColor: '#F5B800',
    borderRadius: 24,
    paddingVertical: 11,
    paddingHorizontal: 26,
  },
  addButtonText: {
    color: '#F5B800',
    fontWeight: '700',
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: '#131B26',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1F2A3A',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#0A0E17',
    color: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#1F2A3A',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 8,
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  modalBtnCancel: {
    backgroundColor: '#1E2836',
  },
  modalBtnCancelText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  modalBtnConfirm: {
    backgroundColor: '#F5B800',
  },
  modalBtnConfirmText: {
    color: '#0A0E17',
    fontWeight: '700',
  },
});
