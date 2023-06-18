export interface ProjectListModel {
  title?: string;
  updatedTime?: string;
  badgeText?: string;
  badgeClass?: string;
  member: Array<{
    name?: string;
    text?: string;
    img?: string;
    variant?: string;
  }>;
  cardBorderColor: string;
}

export interface DocumentModel {
  id: any;
  icon: string;
  iconBackgroundClass: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  updatedDate: string;
}
