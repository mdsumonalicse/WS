export interface ProductionData {
  buyer: string;
  size: string;
  refNo: string;
  bQty: string;
  style: string;
  bNo: string;
  gColour: string;
  bSl: string;
  iColour: string;
}

export interface LabelStyle {
  fontSize: number;
  contentXOffset: number;
}

export const defaultLabelStyle: LabelStyle = {
  fontSize: 11,
  contentXOffset: 0,
};

export const defaultProductionData: ProductionData = {
  buyer: "CALLIOPE",
  size: "S",
  refNo: "110--0279",
  bQty: "40",
  style: "GOKD52770PFANI",
  bNo: "1",
  gColour: "VAR-AZZVRO.CHIARO",
  bSl: "1-40",
  iColour: "VAR-AZZVRO.CHIARO",
};
