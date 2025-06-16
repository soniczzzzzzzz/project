import React, { useState, useEffect } from 'react';
import { MapPin, Loader2, RefreshCw, Zap } from 'lucide-react';

interface CityData {
  name: string;
  lat: number;
  lng: number;
  aqi: number;
  quality: string;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
}

interface InteractiveMapProps {
  selectedCity: string;
  onCitySelect: (city: string) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ selectedCity, onCitySelect }) => {
  const [cities, setCities] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Mock API data - In production, this would be real API calls
  const fetchCityData = async (): Promise<CityData[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return [
      { name: 'Delhi', lat: 28.6139, lng: 77.2090, aqi: 168, quality: 'Unhealthy', pm25: 101, pm10: 134, o3: 67, no2: 50, so2: 34, co: 17 },
      { name: 'Mumbai', lat: 19.0760, lng: 72.8777, aqi: 95, quality: 'Moderate', pm25: 57, pm10: 76, o3: 38, no2: 29, so2: 19, co: 10 },
      { name: 'Kolkata', lat: 22.5726, lng: 88.3639, aqi: 142, quality: 'Unhealthy for Sensitive Groups', pm25: 85, pm10: 114, o3: 57, no2: 43, so2: 28, co: 14 },
      { name: 'Chennai', lat: 13.0827, lng: 80.2707, aqi: 78, quality: 'Moderate', pm25: 47, pm10: 62, o3: 31, no2: 23, so2: 16, co: 8 },
      { name: 'Bangalore', lat: 12.9716, lng: 77.5946, aqi: 85, quality: 'Moderate', pm25: 51, pm10: 68, o3: 34, no2: 26, so2: 17, co: 9 },
      { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, aqi: 92, quality: 'Moderate', pm25: 55, pm10: 74, o3: 37, no2: 28, so2: 18, co: 9 },
      { name: 'Pune', lat: 18.5204, lng: 73.8567, aqi: 88, quality: 'Moderate', pm25: 53, pm10: 70, o3: 35, no2: 26, so2: 18, co: 9 },
      { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, aqi: 125, quality: 'Unhealthy for Sensitive Groups', pm25: 75, pm10: 100, o3: 50, no2: 38, so2: 25, co: 13 },
      { name: 'Jaipur', lat: 26.9124, lng: 75.7873, aqi: 135, quality: 'Unhealthy for Sensitive Groups', pm25: 81, pm10: 108, o3: 54, no2: 41, so2: 27, co: 14 },
      { name: 'Lucknow', lat: 26.8467, lng: 80.9462, aqi: 158, quality: 'Unhealthy', pm25: 95, pm10: 126, o3: 63, no2: 47, so2: 32, co: 16 },
      { name: 'Kanpur', lat: 26.4499, lng: 80.3319, aqi: 172, quality: 'Unhealthy', pm25: 103, pm10: 138, o3: 69, no2: 52, so2: 34, co: 17 },
      { name: 'Nagpur', lat: 21.1458, lng: 79.0882, aqi: 98, quality: 'Moderate', pm25: 59, pm10: 78, o3: 39, no2: 29, so2: 20, co: 10 },
      { name: 'Indore', lat: 22.7196, lng: 75.8577, aqi: 105, quality: 'Unhealthy for Sensitive Groups', pm25: 63, pm10: 84, o3: 42, no2: 32, so2: 21, co: 11 },
      { name: 'Bhopal', lat: 23.2599, lng: 77.4126, aqi: 112, quality: 'Unhealthy for Sensitive Groups', pm25: 67, pm10: 90, o3: 45, no2: 34, so2: 22, co: 11 },
      { name: 'Visakhapatnam', lat: 17.6868, lng: 83.2185, aqi: 82, quality: 'Moderate', pm25: 49, pm10: 66, o3: 33, no2: 25, so2: 16, co: 8 },
    ];
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchCityData();
        setCities(data);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Failed to fetch city data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const refreshData = async () => {
    setLoading(true);
    try {
      const data = await fetchCityData();
      setCities(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to refresh city data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#22C55E';
    if (aqi <= 100) return '#EAB308';
    if (aqi <= 150) return '#F97316';
    if (aqi <= 200) return '#EF4444';
    return '#8B5CF6';
  };

  // Convert lat/lng to pixel coordinates for the map
  const convertToMapCoordinates = (lat: number, lng: number) => {
    // India bounds: lat 6-37, lng 68-97
    const mapWidth = 800;
    const mapHeight = 600;
    const padding = 50;
    
    const x = ((lng - 68) / (97 - 68)) * (mapWidth - 2 * padding) + padding;
    const y = ((37 - lat) / (37 - 6)) * (mapHeight - 2 * padding) + padding;
    
    return { x, y };
  };

  const handleMouseEnter = (city: CityData, event: React.MouseEvent) => {
    setHoveredCity(city.name);
    setShowTooltip(true);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredCity(null);
    setShowTooltip(false);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (showTooltip) {
      setTooltipPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const hoveredCityData = hoveredCity ? cities.find(c => c.name === hoveredCity) : null;

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              {/* Spinning globe effect */}
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-4 border-purple-200 rounded-full animate-spin animate-reverse"></div>
              <div className="absolute inset-4 border-4 border-green-200 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Loading OpenStreetMap</h3>
            <p className="text-gray-600 mb-4">Fetching real-time air quality data...</p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800">Live India Air Quality Map</h3>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">OpenStreetMap</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <button
            onClick={refreshData}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-blue-600 ${loading ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium text-blue-700">Refresh</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-600">Good (≤50)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-gray-600">Moderate (51-100)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-gray-600">Unhealthy (101-150)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-600">Very Unhealthy (>150)</span>
        </div>
      </div>
      
      <div className="relative bg-white rounded-xl overflow-hidden border border-gray-200">
        {/* OpenStreetMap Tile Layer */}
        <div className="relative w-full h-96">
          {/* Map tiles background */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3Cpattern id='osm-grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23e5e7eb' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='800' height='600' fill='%23f8fafc'/%3E%3Crect width='800' height='600' fill='url(%23osm-grid)'/%3E%3C/svg%3E")`,
            }}
          >
            {/* OpenStreetMap style overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-green-50/30"></div>
          </div>

          {/* SVG overlay for India map and cities */}
          <svg
            viewBox="0 0 800 600"
            className="absolute inset-0 w-full h-full"
            onMouseMove={handleMouseMove}
          >
            {/* India Map Outline - OpenStreetMap style */}
            <defs>
              <filter id="mapShadow">
                <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
              </filter>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* India outline with OpenStreetMap styling */}
            <path
              d="M150 120 Q200 90 250 80 Q300 70 350 65 Q400 60 450 55 Q500 60 550 70 Q600 90 630 120 Q650 150 670 190 Q680 230 685 270 Q680 310 670 350 Q650 390 630 420 Q600 450 550 470 Q500 480 450 485 Q400 490 350 495 Q300 500 250 505 Q200 500 150 490 Q100 470 70 440 Q50 400 40 360 Q35 320 40 280 Q50 240 70 200 Q100 160 150 120 Z"
              fill="rgba(220, 252, 231, 0.8)"
              stroke="#059669"
              strokeWidth="2"
              filter="url(#mapShadow)"
              className="transition-all duration-300"
            />
            
            {/* State boundaries - OpenStreetMap style */}
            <g stroke="#6B7280" strokeWidth="1" fill="none" opacity="0.6">
              {/* Major state boundaries */}
              <path d="M150 120 L300 110 L330 170 L300 220 L230 210 L150 190 Z" />
              <path d="M230 210 L400 220 L430 320 L350 350 L270 340 L230 290 Z" />
              <path d="M270 340 L430 350 L450 420 L370 450 L300 440 L270 390 Z" />
              <path d="M370 450 L450 460 L470 520 L400 540 L350 530 L370 490 Z" />
              <path d="M400 350 L500 360 L520 420 L450 440 L400 420 Z" />
              <path d="M450 220 L530 230 L540 290 L500 320 L450 310 Z" />
              <path d="M500 170 L570 180 L580 250 L530 260 L500 240 Z" />
              <path d="M300 110 L450 100 L470 170 L400 190 L330 180 Z" />
              <path d="M300 180 L450 170 L470 250 L400 270 L330 260 Z" />
              <path d="M150 190 L300 180 L330 260 L270 290 L200 280 L150 250 Z" />
            </g>
            
            {/* Rivers - OpenStreetMap style */}
            <g stroke="#3B82F6" strokeWidth="2" fill="none" opacity="0.4">
              <path d="M300 100 Q350 150 400 200 Q450 250 500 300" strokeDasharray="5,5" />
              <path d="M200 200 Q300 250 400 300 Q500 350 600 400" strokeDasharray="3,3" />
            </g>
            
            {/* City Markers with OpenStreetMap styling */}
            {cities.map((city) => {
              const coords = convertToMapCoordinates(city.lat, city.lng);
              const isSelected = selectedCity === city.name;
              const isHovered = hoveredCity === city.name;
              const color = getAQIColor(city.aqi);
              
              return (
                <g key={city.name}>
                  {/* Pulse animation for selected city */}
                  {isSelected && (
                    <>
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r="30"
                        fill={color}
                        opacity="0.2"
                        className="animate-ping"
                      />
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r="20"
                        fill={color}
                        opacity="0.3"
                        className="animate-ping"
                        style={{ animationDelay: '0.5s' }}
                      />
                    </>
                  )}
                  
                  {/* City marker with enhanced styling */}
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={isSelected ? "16" : isHovered ? "14" : "12"}
                    fill={color}
                    stroke="white"
                    strokeWidth="4"
                    className="cursor-pointer transition-all duration-200 hover:stroke-6"
                    filter="url(#glow)"
                    onMouseEnter={(e) => handleMouseEnter(city, e)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => onCitySelect(city.name)}
                  />
                  
                  {/* AQI value with better visibility */}
                  <text
                    x={coords.x}
                    y={coords.y + 2}
                    textAnchor="middle"
                    className="text-xs font-bold fill-white pointer-events-none select-none"
                    style={{ 
                      fontSize: isSelected ? '12px' : '10px',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                    }}
                  >
                    {city.aqi}
                  </text>
                  
                  {/* City name with enhanced background */}
                  <rect
                    x={coords.x - 35}
                    y={coords.y + (isSelected ? 22 : 18)}
                    width="70"
                    height="20"
                    fill="rgba(255, 255, 255, 0.95)"
                    stroke="rgba(0, 0, 0, 0.1)"
                    strokeWidth="1"
                    rx="10"
                    className="pointer-events-none drop-shadow-lg"
                  />
                  <text
                    x={coords.x}
                    y={coords.y + (isSelected ? 35 : 31)}
                    textAnchor="middle"
                    className="text-xs font-semibold fill-gray-800 pointer-events-none select-none"
                    style={{ fontSize: isSelected ? '12px' : '10px' }}
                  >
                    {city.name}
                  </text>
                </g>
              );
            })}
            
            {/* OpenStreetMap attribution */}
            <text
              x="10"
              y="590"
              className="text-xs fill-gray-500"
              style={{ fontSize: '10px' }}
            >
              © OpenStreetMap contributors
            </text>
          </svg>
        </div>
        
        {/* Enhanced Tooltip */}
        {showTooltip && hoveredCityData && (
          <div
            className="fixed z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 pointer-events-none max-w-sm"
            style={{
              left: tooltipPosition.x + 15,
              top: tooltipPosition.y - 10,
              transform: 'translateY(-100%)'
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-6 h-6 rounded-full shadow-lg"
                style={{ backgroundColor: getAQIColor(hoveredCityData.aqi) }}
              ></div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">{hoveredCityData.name}</h4>
                <p className="text-sm text-gray-500">{hoveredCityData.quality}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">AQI:</span>
                  <span className="font-semibold text-gray-800">{hoveredCityData.aqi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">PM2.5:</span>
                  <span className="font-semibold text-gray-800">{hoveredCityData.pm25}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">PM10:</span>
                  <span className="font-semibold text-gray-800">{hoveredCityData.pm10}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">O₃:</span>
                  <span className="font-semibold text-gray-800">{hoveredCityData.o3}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">NO₂:</span>
                  <span className="font-semibold text-gray-800">{hoveredCityData.no2}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SO₂:</span>
                  <span className="font-semibold text-gray-800">{hoveredCityData.so2}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-3 space-y-1 text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Latitude:</span>
                <span className="font-mono">{hoveredCityData.lat.toFixed(4)}°</span>
              </div>
              <div className="flex justify-between">
                <span>Longitude:</span>
                <span className="font-mono">{hoveredCityData.lng.toFixed(4)}°</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Click on any city marker to view detailed air quality information • Powered by OpenStreetMap • Data updates every 5 minutes
        </p>
      </div>
    </div>
  );
};

export default InteractiveMap;