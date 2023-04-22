export const labelDeviceVi = [
  { key: 'asset_code', name: 'Mã tài sản' },
  { key: 'date_bought', name: 'Ngày mua' },
  { key: 'date_use', name: 'Ngày sử dung' },
  {
    key: 'asset_type_collection',
    name: 'Tập loại',
    children: [
      {
        key: 'asset_type_name',
        name: 'Loại',
      },
    ],
  },
  { key: 'asset_name', name: 'Tên' },
  { key: 'distributor_id', name: 'Nhà cung cấp' },
  {
    key: 'user_using_collection',
    name: 'NV sử dụng hiện tại',
    children: [
      {
        key: 'email',
        name: 'Email NV sử dụng hiện tại',
      },
    ],
  },
  {
    key: 'user_used_collection',
    name: 'NV đã từng sử dụng',
    children: [
      {
        key: 'email',
        name: 'Email NV đã từng sử dụng',
      },
    ],
  },
  { key: 'bill_number', name: 'Số hóa đơn' },
  { key: 'total_amount', name: 'Tổng tiền' },
  { key: 'configurationDetails', name: 'Chi tiết cấu hình' },
  { key: 'upgradeContent', name: 'Nội dung nâng cấp/sửa chữa' },
  { key: 'status', name: 'Tình trạng tài sản' },
  { key: 'describe', name: 'Mô tả' },
  { key: 'created_at', name: 'Ngày tạo' },
  { key: 'updated_at', name: 'Ngày cập nhật' },
];

export const labelDeviceEn = [
  { key: 'asset_code', name: 'Property code' },
  { key: 'date_bought', name: 'Purchase date' },
  { key: 'date_use', name: 'Date of use' },
  {
    key: 'asset_type_collection',
    name: 'Type collection',
    children: [
      {
        key: 'asset_type_name',
        name: 'Type',
      },
    ],
  },
  { key: 'asset_name', name: 'Name' },
  { key: 'distributor_id', name: 'supplier' },
  {
    key: 'user_using_collection',
    name: 'current user staff',
    children: [
      {
        key: 'email',
        name: 'Email current user staff',
      },
    ],
  },
  {
    key: 'user_used_collection',
    name: 'staff used to use',
    children: [
      {
        key: 'email',
        name: 'Email staff used to use',
      },
    ],
  },
  { key: 'bill_number', name: 'Some bills' },
  { key: 'total_amount', name: 'Total amount' },
  { key: 'configurationDetails', name: 'Configuration details' },
  { key: 'upgradeContent', name: 'Content upgrade/repair' },
  { key: 'status', name: 'Property Status' },
  { key: 'describe', name: 'Describe' },
  { key: 'created_at', name: 'Date created' },
  { key: 'updated_at', name: 'Update day' },
];
