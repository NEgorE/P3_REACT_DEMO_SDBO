import { Maudaucrr } from '../lists/mau_dau_crr/mau_dau_crr.js';
import { Services } from '../lists/services/services.js';
import { Sessions } from '../lists/sessions/sessions.js';

export const TABS = [
    {title: 'MAU/DAU/CRR', type: 1, obj: <Maudaucrr current_list_name='maudaucrr'/>},
    {title: 'Services', type: 2, obj: <Services />},
    {title: 'Sessions', type: 3, obj: <Sessions />},
    {title: 'Add next tab...', type: 4},
  ]

export const METRICS = [
    { npp: 'metric1', title: 'MAU', value: 'mau'},
    { npp: 'metric2', title: 'DAU', value: 'dau'},
]