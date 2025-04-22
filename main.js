const dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];

const strategyArray = [
    {
        View: 'Bullish',
        Value: {
          '24-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Long Call','Bull Put Spread','Bull Call Spread','Strategy1','Bull Call Spread','Strategy1','Strategy1','Spread Strategy','Bull Call Spread'],
          '02-May-2024': ['Bull Call Spread','Bull Call Spread','Bull Put Spread','Long Call','Long Call','Long Call','Bull Put Spread','Bull Call Spread','Strategy1','Bull Call Spread','Strategy2','Strategy1','Strategy2','Bull Call Spread'],
          '09-May-2024': ['Strategy Put','Strategy Call','Strategy Call','Strategy Call','Strategy Put']
        }
      },
    {
    View: 'Bearish',
    Value: {
      '24-Apr-2024': ['Bear Call Spread', 'Bear Call Spread', 'Bear Call Spread', 'Long Put', 'Long Put', 'Bear Call Spread'],
      '31-May-2024': ['Long Put', 'Long Put', 'Long Put', 'Long Put'],
      '21-Jun-2024': ['Strategy3', 'Strategy3', 'Bear Put Spread', 'Strategy3', 'Long Put', 'Long Put']
    },
  },
 
  {
    View: 'Rangebound',
    Value: {
      '24-Apr-2024': ['Short Straddle', 'Short Strangle','Short Strangle','Iron Butterfly','Short Strangle','Short Straddle','Strategy1','Short Straddle','Strategy1','Strategy1','Spread Strategy','Short Straddle'],
      '02-May-2024': ['Short Straddle','Short Straddle','Short Strangle','Iron Butterfly','Iron Butterfly','Iron Butterfly','Short Strangle','Short Straddle','Strategy1','Short Straddle','Strategy2','Strategy1','Strategy2','Short Straddle'],
      '21-Jun-2024': ['Iron Condor','Iron Butterfly','Iron Butterfly','Iron Butterfly','Iron Condor']
    }
  },
  {
    View: 'Volatile',
    Value: {
      '02-May-2024': ['Long Straddle', 'Long Strangle','Long Strangle','Long Strangle','Long Straddle','Strategy1','Long Straddle','Strategy1','Strategy1','Spread Strategy','Long Straddle'],
      '09-May-2024': ['Long Straddle','Long Straddle','Long Strangle','Long Strangle','Long Straddle','Strategy1','Long Straddle','Strategy1','Strategy2','Strategy1','Long Straddle'   ],
      '31-May-2024': ['Long Straddle','Long Strangle','Long Strangle','Long Strangle','Short Straddle']
    }
  }
];

let currentView = 'Bearish';
const dateSelect = document.getElementById('dateSelect');
const container = document.getElementById('strategyContainer');

function populateDates() {
  dateSelect.innerHTML = '';
  dateArray.forEach(date => {
    const option = document.createElement('option');
    option.value = date;
    option.textContent = date;
    dateSelect.appendChild(option);
  });
}
function renderStrategies() {
    const selectedDate = dateSelect.value;
    const viewData = strategyArray.find(entry => entry.View === currentView);
    const strategies = viewData?.Value[selectedDate] || [];
  
    container.innerHTML = '';
    if (strategies.length === 0) {
      container.innerHTML = `<div class="empty">There are no strategies for <strong>${selectedDate}</strong></div>`;
      return;
    }
  

    const strategyCount = strategies.reduce((acc, strategy) => {
      acc[strategy] = (acc[strategy] || 0) + 1;
      return acc;
    }, {});
  
    Object.entries(strategyCount).forEach(([strategy, count]) => {
      const div = document.createElement('div');
      div.className = 'strategy-card';
  
 
      const strategyName = document.createElement('span');
      strategyName.className = 'strategy-name';
      strategyName.textContent = strategy;
  

      const countSpan = document.createElement('span');
      countSpan.className = 'strategy-count';
      countSpan.textContent = `.${count} strategies`;
  

      div.appendChild(strategyName);
      div.appendChild(countSpan);
      container.appendChild(div);
    });
  }

function selectView(view) {
  currentView = view;
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.textContent === view) tab.classList.add('active');
  });
  renderStrategies();
}


populateDates();
renderStrategies();
