import xlrd


d = {}
wb = xlrd.open_workbook('fi_dictionary.xls')
sh = wb.sheet_by_index(2)
for i in range(138):
    cell_value_class = sh.cell(i, 2).value
    cell_value_id = sh.cell(i, 0).value
    d[cell_value_class] = cell_value_id
