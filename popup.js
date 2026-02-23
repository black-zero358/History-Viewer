let exportDataList = []; // 全局变量，用于暂存准备导出的扁平化数据

document.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);
  
  document.getElementById('endDate').valueAsDate = today;
  document.getElementById('startDate').valueAsDate = lastWeek;

  document.getElementById('searchBtn').addEventListener('click', performSearch);
  document.getElementById('exportBtn').addEventListener('click', exportToExcel);
});

function performSearch() {
  const startInput = document.getElementById('startDate').value;
  const endInput = document.getElementById('endDate').value;
  const resultsDiv = document.getElementById('results');
  const exportBtn = document.getElementById('exportBtn');

  if (!startInput || !endInput) {
    resultsDiv.innerHTML = "请选择完整的起止时间。";
    return;
  }

  // 每次重新查询时，重置导出数据和按钮状态
  exportDataList = []; 
  exportBtn.style.display = 'none';
  resultsDiv.innerHTML = "正在查询...";

  const startTime = new Date(startInput).getTime();
  const endTime = new Date(endInput).getTime() + (24 * 60 * 60 * 1000) - 1;

  chrome.history.search({
    text: '',
    startTime: startTime,
    endTime: endTime,
    maxResults: 50000 
  }, (historyItems) => {
    
    const groupedData = new Map();

    historyItems.forEach(item => {
      const dateStr = new Date(item.lastVisitTime).toLocaleDateString();
      
      try {
        const urlObj = new URL(item.url);
        let domain = urlObj.hostname;

        const parts = domain.split('.');
        if (parts.length >= 3) {
            const secondLevel = parts[parts.length - 2];
            if (['com', 'net', 'org', 'edu', 'gov'].includes(secondLevel)) {
                domain = parts.slice(-3).join('.');
            } else {
                domain = parts.slice(-2).join('.');
            }
        }

        if (!groupedData.has(dateStr)) {
          groupedData.set(dateStr, new Map());
        }

        const dayMap = groupedData.get(dateStr);
        if (!dayMap.has(domain)) {
          dayMap.set(domain, item);
        }
      } catch (e) {
        // 忽略无法解析的特殊内置 URL
      }
    });

    // 遍历去重后的结果，构建用于导出 Excel 的数据格式
    groupedData.forEach((dayMap, dateStr) => {
      dayMap.forEach((item, domain) => {
        exportDataList.push({
          "访问日期": dateStr,
          "主域名": domain,
          "页面标题": item.title || "无标题",
          "完整URL": item.url,
          "历史总访问次数": item.visitCount,     // 浏览器记录的该URL历史总访问次数
          "手动输入次数": item.typedCount,        // 用户在地址栏手动输入该URL的次数
          "最后访问精确时间": new Date(item.lastVisitTime).toLocaleString()
        });
      });
    });

    renderResults(groupedData);

    // 如果查询到数据，显示导出按钮
    if (exportDataList.length > 0) {
      exportBtn.style.display = 'inline-block';
    }
  });
}

function renderResults(groupedData) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (groupedData.size === 0) {
    resultsDiv.innerHTML = "该时间段内没有历史记录。";
    return;
  }

  const sortedDates = Array.from(groupedData.keys()).sort((a, b) => new Date(b) - new Date(a));

  sortedDates.forEach(date => {
    const dayGroup = document.createElement('div');
    dayGroup.className = 'day-group';

    const dayTitle = document.createElement('div');
    dayTitle.className = 'day-title';
    dayTitle.textContent = date;
    dayGroup.appendChild(dayTitle);

    const dayMap = groupedData.get(date);
    dayMap.forEach((item, domain) => {
      const recordItem = document.createElement('div');
      recordItem.className = 'record-item';
      
      const link = document.createElement('a');
      link.href = item.url;
      link.target = '_blank';
      link.textContent = `[${domain}] ${item.title || item.url}`;
      
      recordItem.appendChild(link);
      dayGroup.appendChild(recordItem);
    });

    resultsDiv.appendChild(dayGroup);
  });
}

// 导出 Excel 的核心功能
function exportToExcel() {
  if (exportDataList.length === 0) return;

  // 使用 SheetJS 将 JSON 数组转换为工作表
  const worksheet = XLSX.utils.json_to_sheet(exportDataList);
  
  // 设置一下列宽，让导出的表格稍微好看一点
  worksheet['!cols'] = [
    { wch: 12 },  // 访问日期
    { wch: 20 },  // 主域名
    { wch: 40 },  // 页面标题
    { wch: 50 },  // 完整URL
    { wch: 15 },  // 历史总访问次数
    { wch: 15 },  // 手动输入次数
    { wch: 20 }   // 最后访问精确时间
  ];

  // 创建工作簿并附加工作表
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "历史记录");
  
  // 触发浏览器下载
  XLSX.writeFile(workbook, "浏览器去重历史记录.xlsx");
}