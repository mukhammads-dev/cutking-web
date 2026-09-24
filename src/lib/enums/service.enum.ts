export enum ServiceStatus {
  PROCESS = "PROCESS",
  PAUSE = "PAUSE",
  DELETE = "DELETE",
}

export enum ServiceCollection {
  SIGNATURE = "SIGNATURE",
  HAIRCUT = "HAIRCUT",
  PERM = "PERM",
  BEARD = "BEARD",
  COLOR = "COLOR",
  SCALP_CARE = "SCALP_CARE",
  STYLING = "STYLING",
  PACKAGE = "PACKAGE",
}

export enum ServiceSort {
  NEW = "createdAt",
  PRICE = "servicePrice",
  VIEWS = "serviceViews",
}
