import { StyleSheet } from "react-native";
import { dynamicSize, height, width } from "../../utils/responsive";
import { NumberConstants } from "../../constants/NumberConstants";
import { ColorConstants } from "../ColorConstants";
import { AlignmentConstants } from "../../constants/StringConstants";

export const RecuriterDashboardStyle = StyleSheet.create({
  container: {
    flexDirection: AlignmentConstants.ROW,
    alignItems: AlignmentConstants.CENTER,
  },
  addJobImage: {
    height: dynamicSize(NumberConstants.VALUE_40),
    width: dynamicSize(NumberConstants.VALUE_40),
    left: width / NumberConstants.VALUE_2,
  },
  editPostText: {
    fontWeight: AlignmentConstants.BOLD,
    color: ColorConstants.WHITE,
  },
  modalContainer: {
    flex: NumberConstants.VALUE_1,
    justifyContent: AlignmentConstants.CENTER,
    paddingHorizontal: dynamicSize(NumberConstants.VALUE_20),
    paddingTop: height / NumberConstants.VALUE_10 - NumberConstants.VALUE_30,
  },
  modalButtonView: {
    flexDirection: AlignmentConstants.ROW,
    justifyContent: AlignmentConstants.SPACE_EVENLY,
  },
  buttonView: {
    flexDirection:'row',
  },
  deleteJobButton: {
    backgroundColor: ColorConstants.RED,
    width: dynamicSize(NumberConstants.VALUE_90),
    alignItems: AlignmentConstants.CENTER,
    height: dynamicSize(NumberConstants.VALUE_30),
    padding: dynamicSize(NumberConstants.VALUE_5),
    marginTop: dynamicSize(NumberConstants.VALUE_8),
    borderRadius: dynamicSize(NumberConstants.VALUE_10),
  },
  deleteButtonView: {
    marginLeft: dynamicSize(NumberConstants.VALUE_15)
  }
});
