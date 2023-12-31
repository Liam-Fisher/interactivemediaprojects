export const defaultDesktopSizes = {
    'dial': [120,120],
    'number': [60,20],
    'slider': [200,40],
    'umenu': [100,40],
    'toggle': [60,40],
    'function': [200, 100],
    'kslider': [450, 120],
    'textbutton': [100, 30],
}
export const defaultHandsetSizes = {
    'dial': [80,80],
    'number': [80,30],
    'slider': [160,20],
    'umenu': [60,20],
    'toggle': [40,20],
    'function': [200, 100],
    'kslider': [240, 70],
    'textbutton': [100, 30],
}
export const defaultDesktopRatios = {
    'dial': [12,12],
    'number': [60,20],
    'slider': [12,2],
    'umenu': [6,2],
    'toggle': [1,2],
    'kslider': [12, 4],
    'textbutton': [6,2],
}

//add a function

export function _getDefaultSize(elementType: string) {
    return (window.innerWidth < 600) ? defaultHandsetSizes[elementType as keyof typeof defaultHandsetSizes] : defaultDesktopSizes[elementType as keyof typeof defaultDesktopSizes];
    }

