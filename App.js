import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Dimensions, Image, ImageBackground, ScrollView, Text, View, StyleSheet, TouchableOpacity, Button, TextInput, Modal} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const Tab = createBottomTabNavigator();
const MeStack = createStackNavigator();
const LeaderBoardStack = createStackNavigator();

// Sample data for the chart
const data = {
  labels: ['June 6', 'June 20', 'July 4', 'July 18', 'Aug 1', 'Aug 8'],
  datasets: [
    {
      data: [0, 0, 0, 0, 0, 0],
      color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
      strokeWidth: 2,
    },
    {
      data: [0, 10, 20, 15, 18, 25],
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      strokeWidth: 2,
    },
    {
      data: [0, 1, 1, 1, 1, 1],
      color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
      strokeWidth: 2,
    },
  ],
  legend: ['Me', 'Average', 'Luis'],
};

// Import custom icons
import MeIcon from './assets/Me.png';
import TeamIcon from './assets/Team.png';
import OfficeIcon from './assets/Community.png';
import LeaderboardIcon from './assets/leader.png';

// Me Tab
function MeScreen({ navigation }) {
  return (
    <ImageBackground source={require('./assets/shadow.jpg')} style={styles.imageBackground}>
      <ScrollView style={styles.overlay}>
        <Text style={styles.header}>Hello Mauricio!</Text>
        <LineChart
          data={data}
          width={screenWidth - 40}
          height={250}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
            propsForBackgroundLines: {
              strokeDasharray: '', // solid background lines
            },
            propsForLabels: {
              fontSize: 12,
            },
            legendFontSize: 15,
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          withDots
          withInnerLines={false}
          withOuterLines={false}
        />
        <View style={styles.emissionsBox}>
          <Text style={styles.emissionsTitle}>Emissions Index</Text>
          <Text style={styles.emissionsValue}>20</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Trees Saved</Text>
            <Text style={styles.cardValue}>750</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Office Ranking</Text>
            <Text style={styles.cardValue}>#21</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Individual Ranking</Text>
            <Text style={styles.cardValue}>#3</Text>
          </View>
        </View>
        <Button title="View Progress" onPress={() => navigation.navigate('Progress')} />
      </ScrollView>
    </ImageBackground>
  );
}

// Team Tab
// Team Tab
function TeamScreen({ route, navigation }) {
  const { message } = route.params || {};
  const [teamMembers, setTeamMembers] = useState([
    { name: 'Hanson Deck', email: 'hanson@deck.com' },
    { name: 'Sue Shei', email: 'sue@shei.com' },
    { name: 'Jason Response', email: 'jason@response.com' },
    { name: 'Cher Actor', email: 'cher@actor.com' },
  ]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [inviteMessage, setInviteMessage] = useState('');

  useEffect(() => {
    if (message) {
      setInviteMessage(message);
    }
  }, [message]);

  const [searchText, setSearchText] = useState('');

  const toggleSelection = (member) => {
    setSelectedMembers((prev) =>
      prev.includes(member) ? prev.filter((m) => m !== member) : [...prev, member]
    );
  };

  const handleInvite = () => {
    if (selectedMembers.length === 0) {
      alert('Please select at least one team member to invite');
      return;
    }
    alert(`Invite sent to ${selectedMembers.map((m) => m.name).join(', ')} with message: ${inviteMessage}`);
    // Clear selections and input fields
    setSelectedMembers([]);
    setSearchText('');
    setInviteMessage('');
    navigation.setParams({ message: '' });
  };

  return (
    <ImageBackground source={require('./assets/shadow.jpg')} style={styles.imageBackground}>
      <ScrollView style={styles.overlay}>
        <Text style={styles.header}>Teams Collaboration</Text>
        <View style={styles.section}>
          <Text style={styles.title}>People</Text>
          <TextInput
            style={styles.input}
            placeholder="Search People"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
          {teamMembers
            .filter((member) => member.name.toLowerCase().includes(searchText.toLowerCase()))
            .map((member, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.memberItem,
                  selectedMembers.includes(member) && styles.selectedMemberItem,
                ]}
                onPress={() => toggleSelection(member)}
              >
                <Text style={styles.value}>{member.name}</Text>
                <Text style={styles.email}>{member.email}</Text>
              </TouchableOpacity>
            ))}
        </View>
        <View style={styles.section}>
          <TextInput
            style={styles.input}
            placeholder="Attach a message"
            value={inviteMessage}
            onChangeText={setInviteMessage}
          />
          <Button title="Invite" onPress={handleInvite} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

// Office Community Tab
function OfficeCommunityScreen() {
  const navigation = useNavigation();
  const [selectedOffice, setSelectedOffice] = useState('Chicago');
  const [engagements, setEngagements] = useState([
    { id: 1, name: 'Nature Warblers', office: 'Chicago', date: '2024-09-10', website: 'https://www.chicagoenvironment.org/events/dsp_eventdetail.cfm?EventID=42758&caller=http%253A%252F%252Fwww%252Echicagoenvironment%252Eorg' },
    { id: 2, name: 'Pedal the Preserves', office: 'Chicago', date: '2024-08-24', website: 'https://www.chicagoenvironment.org/events/dsp_eventdetail.cfm?EventID=45832&caller=http%253A%252F%252Fwww%252Echicagoenvironment%252Eorg' },
    { id: 3, name: 'The Giving Garden on The Plaza', office: 'Tysons', date: '2024-11-01', website: 'https://www.tysonscornercenter.com/Events/Details/575748' },
    { id: 4, name: 'Road to Zero', office: 'Chicago', date: '2024-08-09', website: 'https://illinoisgreenalliance.org/inspire_events/road-to-zero-fifth-city-commons-building-tour/' },
    { id: 5, name: 'E Scrap Conference', office: 'Orlando', date: '2024-30-09', website: 'https://www.e-scrapconference.com/' },
    { id: 6, name: 'Electronic Waste & Textile Recycling - Festival Park', office: 'Orlando', date: '2024-10-12', website: 'https://www.orlando.gov/Events/Electronic-Waste-Textile-Recycling-Event-Festival-Park' },
  ]);

  const [signUpMessage, setSignUpMessage] = useState('');

  const handleSignUp = (engagementId) => {
    const engagement = engagements.find((e) => e.id === engagementId);
    setSignUpMessage(`You have successfully signed up for ${engagement.name} on ${engagement.date}.`);
    setTimeout(() => setSignUpMessage(''), 5000); // Clear the message after 5 seconds
  };

  const handleInvite = (engagement) => {
    navigation.navigate('Team', {
      message: `Come to the ${engagement.name} on ${engagement.date} with me. ${engagement.website}`,
    });
  };

  return (
    <ImageBackground source={require('./assets/shadow.jpg')} style={styles.imageBackground}>
      <ScrollView style={styles.overlay}>
        <Text style={styles.header}>Office Community</Text>
        <View style={styles.section}>
          <Text style={styles.title}>Select Office</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedOffice}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedOffice(itemValue)}
            >
              <Picker.Item label="Chicago" value="Chicago" />
              <Picker.Item label="Tysons" value="Tysons" />
              <Picker.Item label="Orlando" value="Orlando" />
            </Picker>
          </View>
        </View>
        <View style={styles.section}>
          {engagements
            .filter((engagement) => engagement.office === selectedOffice)
            .map((engagement) => (
              <View key={engagement.id} style={styles.engagement}>
                <Text style={styles.engagementTitle}>{engagement.name}</Text>
                <Text style={styles.engagementDate}>Date: {engagement.date}</Text>
                <Text style={styles.engagementWebsite}>Learn more: {engagement.website}</Text>
                <View style={styles.buttonRow}>
                  <Button title="Sign Up" onPress={() => handleSignUp(engagement.id)} />
                  <Button title="Invite" onPress={() => handleInvite(engagement)} />
                </View>
              </View>
            ))}
        </View>
        {signUpMessage ? <Text style={styles.signUpMessage}>{signUpMessage}</Text> : null}
      </ScrollView>
    </ImageBackground>
  );
}

// Leaderboard Screen
function LeaderBoardScreen({ navigation }) {
  const [offices, setOffices] = useState([
    { name: 'Chicago', totalCO2: '812675 MT', change: 20, treesSaved: '2000', date: new Date() },
    { name: 'Tysons', totalCO2: '438760 MT', change: -14, treesSaved: '1500', date: new Date() },
    { name: 'Orlando', totalCO2: '370000 MT', change: 5, treesSaved: '1000', date: new Date() },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffices((prevOffices) =>
        prevOffices.map((office) => ({
          ...office,
          change: office.change + (Math.random() * 10 - 5), // Random change for demonstration
          date: new Date(),
        }))
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const sortedOffices = [...offices].sort((a, b) => a.change - b.change); // Sort offices by change percentage, greatest negative first

  return (
    <ImageBackground source={require('./assets/shadow.jpg')} style={styles.imageBackground}>
      <ScrollView style={styles.overlay} contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>LeaderBoard</Text>
        <ScrollView horizontal contentContainerStyle={styles.horizontalScrollViewContent}>
          <View style={styles.table}>
            <View style={styles.tableRowHeader}>
              <Text style={styles.tableHeaderTextLeft}>Rank</Text>
              <Text style={styles.tableHeaderTextRight}>Office</Text>
              <Text style={styles.tableHeaderTextRight}>Total CO2*</Text>
              <Text style={styles.tableHeaderTextRight}>Change</Text>
              <Text style={styles.tableHeaderTextRight}>Trees Saved</Text>
            </View>
            {sortedOffices.map((office, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tableRow}
                onPress={() => {
                  let officeData;
                  switch (office.name) {
                    case 'Chicago':
                      officeData = getChicagoEmissions();
                      break;
                    case 'Tysons':
                      officeData = getTysonsEmissions();
                      break;
                    case 'Orlando':
                      officeData = getOrlandoEmissions();
                      break;
                    default:
                      officeData = { labels: [], datasets: [] };
                  }
                  navigation.navigate('EngagementDetails', { office: office.name, data: officeData });
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.tableCellTextLeft}>{index + 1}</Text>
                <Text style={styles.tableCellTextRight}>{office.name}</Text>
                <Text style={styles.tableCellTextRight}>{office.totalCO2}</Text>
                <Text style={[styles.tableCellTextRight, { color: office.change < 0 ? 'green' : 'red' }]}>
                  {Number(office.change).toFixed(2)}%
                </Text>
                <Text style={styles.tableCellTextRight}>{office.treesSaved}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <Text style={styles.asterisk}>* MT = Metric Tons</Text>
      </ScrollView>
    </ImageBackground>
  );
}

const getChicagoEmissions = () => ({
  labels: ['CO2', 'CH4', 'N2O'],
  datasets: [
    {
      data: [812675396, 3215014, 25892737],
      colors: ['green', 'orange', 'red'], // optional color coding
    }
  ]
});
const getTysonsEmissions = () => ({
  labels: ['CO2', 'CH4', 'N2O'],
  datasets: [
    {
      data: [31653957, 125225, 1008530],
      colors: ['green', 'orange', 'red'],
    }
  ]
});
const getOrlandoEmissions = () => ({
  labels: ['CO2', 'CH4', 'N2O'],
  datasets: [
    {
      data: [370145951, 1464329, 11793259],
      colors: ['green', 'orange', 'red'],
    }
  ]
});

// Engagement/Individual Leaderboard
function EngagementDetailsScreen({ route }) {
  const { office, data } = route.params;
  const [engagements, setEngagements] = useState([
    { person: 'Person 1', totalCO2: '10', change: 5, saved: 50, date: new Date() },
    { person: 'Person 2', totalCO2: '50', change: -6, saved: 50 },
    { person: 'Person 3', totalCO2: '25', change: 1, saved: 50, date: new Date() },
  ]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setEngagements((prevEngagements) =>
        prevEngagements.map((engagement) => ({
          ...engagement,
          change: engagement.change + (Math.random() * 10 - 5), // Random change for demonstration
          date: new Date(),
        }))
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const sortedEngagements = [...engagements].sort((a, b) => a.change - b.change); // Sort engagements by change percentage, greatest negative first

  const pieChartData = data.datasets[0].data.map((value, index) => ({
    name: `${data.labels[index]} ${index === 0 ? 'kg' : 'g'}`,
    population: value,
    color: data.datasets[0].colors[index],
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  return (
    <ImageBackground source={require('./assets/shadow.jpg')} style={styles.imageBackground}>
      <ScrollView style={styles.overlay}>
        <ScrollView horizontal>
          <View>
            <Text style={styles.header}>Office: {office}</Text>
            <TextInput
              style={styles.input}
              placeholder="Search Engagement"
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#999"
            />
            <View style={styles.table}>
              <View style={styles.tableRowHeader}>
                <Text style={styles.tableHeaderText}>Rank</Text>
                <Text style={styles.tableHeaderText}>Person</Text>
                <Text style={styles.tableHeaderText}>Total CO2</Text>
                <Text style={styles.tableHeaderText}>Change</Text>
                <Text style={styles.tableHeaderText}>Trees Saved</Text>
              </View>
              {sortedEngagements
                .filter((engagement) => engagement.person.toLowerCase().includes(searchText.toLowerCase()))
                .map((engagement, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCellText}>{index + 1}</Text>
                    <Text style={styles.tableCellText}>{engagement.person}</Text>
                    <Text style={styles.tableCellText}>{engagement.totalCO2}</Text>
                    <Text style={[styles.tableCellText, { color: engagement.change < 0 ? 'green' : 'red' }]}>
                      {Number(engagement.change).toFixed(2)}%
                    </Text>
                    <Text style={styles.tableCellText}>{engagement.saved}</Text>
                  </View>
                ))}
            </View>
            <Text style={styles.header}>Flight Emissions Breakdown</Text>
            <PieChart
              data={pieChartData}
              width={screenWidth}
              height={220}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        </ScrollView>
      </ScrollView>
    </ImageBackground>
  );
}

const ProgressScreen = () => {
  const [progress, setProgress] = useState(0); // Initial progress percentage
  const [weeklyAlertShown, setWeeklyAlertShown] = useState(false);
  const [monthlyAlertShown, setMonthlyAlertShown] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const milestones = [10, 20, 30, 40, 50]; // Example milestones
  const [selectedPeriod, setSelectedPeriod] = useState('weekly'); // Track selected period
  const [events, setEvents] = useState([
    { id: 1, name: 'Recycling Day', done: false, emissionsSaved: '2 metric tons', period: 'weekly' },
    { id: 2, name: 'Trash Pick Up Day', done: false, emissionsSaved: '2.5 metric tons', period: 'weekly' },
    { id: 3, name: 'Community Garden CleanUp', done: false, emissionsSaved: '2 metric tons', period: 'weekly' },
    { id: 4, name: 'Plant Trees Day', done: false, emissionsSaved: '3 metric tons', period: 'weekly' },
    { id: 5, name: 'Monthly Clean Sweep', done: false, emissionsSaved: '10 metric tons', period: 'monthly' },
    { id: 6, name: 'Corporate Recycling Initiative', done: false, emissionsSaved: '15 metric tons', period: 'monthly' },
    { id: 7, name: 'Community Sustainability Fair', done: false, emissionsSaved: '20 metric tons', period: 'monthly' },
  ]);

  useEffect(() => {
    // Check if weekly progress is 100% and alert has not been shown yet
    if (selectedPeriod === 'weekly' && progress >= 100 && !weeklyAlertShown) {
      setWeeklyAlertShown(true);
      setModalMessage('Reached Weekly Milestone 1: Received $10 Metro gift');
      setModalVisible(true);
    }
    // Check if monthly progress is 100% and alert has not been shown yet
    if (selectedPeriod === 'monthly' && progress >= 100 && !monthlyAlertShown) {
      setMonthlyAlertShown(true);
      setModalMessage('Reached Monthly Milestone 1: Received $50 Gift Card');
      setModalVisible(true);
    }
  }, [progress, selectedPeriod, weeklyAlertShown, monthlyAlertShown]);

  const handleMarkComplete = (eventId) => {
    const updatedEvents = events.map(event =>
      event.id === eventId ? { ...event, done: true } : event
    );
    setEvents(updatedEvents);
    const completedEvents = updatedEvents.filter(event => event.done && event.period === selectedPeriod).length;
    const totalEvents = updatedEvents.filter(event => event.period === selectedPeriod).length;
    const newProgress = (completedEvents / totalEvents) * 100;
    setProgress(newProgress);
  };

  return (
    <ImageBackground source={require('./assets/shadow.jpg')} style={styles.imageBackground}>
      <ScrollView style={styles.overlay}>
        <Text style={styles.header}>My Progress</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedPeriod}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setSelectedPeriod(itemValue);
              setProgress(0); // Reset progress when period changes
              setWeeklyAlertShown(false); // Reset weekly alert
              setMonthlyAlertShown(false); // Reset monthly alert
            }}
          >
            <Picker.Item label="Weekly" value="weekly" />
            <Picker.Item label="Monthly" value="monthly" />
          </Picker>
        </View>
        <Text style={styles.goal}>Goal: {progress}% achieved</Text>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${progress}%` }]} />
            {milestones.map((milestone, index) => (
              <View key={index} style={[styles.milestone, { left: `${milestone - 5}%` }]}>
                <Text style={styles.milestoneText}>Milestone {index + 1}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Things to Do</Text>
          {events.filter(event => event.period === selectedPeriod).map(event => (
            <View key={event.id} style={[styles.eventItem, { backgroundColor: event.done ? 'green' : 'white' }]}>
              <Text style={styles.eventText}>{event.name}</Text>
              <Text style={styles.emissionsText}>Saved {event.emissionsSaved}</Text>
              {!event.done && (
                <Button title="Mark as Complete" onPress={() => handleMarkComplete(event.id)} />
              )}
            </View>
          ))}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Button title="Close" onPress={() => setModalVisible(!modalVisible)} />
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
};

function MeStackScreen() {
  return (
    <MeStack.Navigator>
      <MeStack.Screen name="Me" component={MeScreen} />
      <MeStack.Screen name="Progress" component={ProgressScreen} />
    </MeStack.Navigator>
  );
}

function LeaderBoardStackScreen() {
  return (
    <LeaderBoardStack.Navigator>
      <LeaderBoardStack.Screen name="LeaderBoard" component={LeaderBoardScreen} />
      <LeaderBoardStack.Screen name="EngagementDetails" component={EngagementDetailsScreen} />
    </LeaderBoardStack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Me') {
                iconName = MeIcon;
              } else if (route.name === 'Team') {
                iconName = TeamIcon;
              } else if (route.name === 'Office Community') {
                iconName = OfficeIcon;
              } else if (route.name === 'LeaderBoard') {
                iconName = LeaderboardIcon;
              }
              return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
            },
            tabBarStyle: { backgroundColor: 'green' },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'white',
            style: { backgroundColor: 'rgb(0, 47, 108)' },
          }}
        >
          <Tab.Screen name="Me" component={MeStackScreen} />
          <Tab.Screen name="Team" component={TeamScreen} />
          <Tab.Screen name="Office Community" component={OfficeCommunityScreen} />
          <Tab.Screen name="LeaderBoard" component={LeaderBoardStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
    pickerContainer: {
    backgroundColor: '#fff', // White background for better visibility
    borderRadius: 5,         // Rounded corners
    marginBottom: 20,        // Space below the picker
    overflow: 'hidden',      // Ensure the dropdown is contained within the rounded corners
  },
  picker: {
    height: 50,              // Adequate height for the dropdown
    width: '100%',           // Full width to match the container
    color: '#000',           // Black text color for better readability
    backgroundColor: '#fff', // White background color for better readability
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 47, 108, 0.6)', // Adjust the opacity as needed
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center', // Center align header text
  },
  table: {
    minWidth: screenWidth, // Ensure the table is at least as wide as the screen
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  tableRowHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
  },
  tableHeaderTextLeft: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'left', // Left align for Rank header
  },
  tableHeaderTextRight: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'right', // Right align for other headers
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
  },
  tableCellTextLeft: {
    fontSize: 14,
    flex: 1,
    textAlign: 'left', // Left align for Rank cells
  },
  tableCellTextRight: {
    fontSize: 14,
    flex: 1,
    textAlign: 'right', // Right align for other cells
  },
  asterisk: {
    marginTop: 10,
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  goal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  progressBarContainer: {
    height: 40,
    marginBottom: 20,
    position: 'relative',
  },
  progressBar: {
    flex: 1,
    flexDirection: 'row',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progress: {
    backgroundColor: 'red',
    height: '100%',
  },
  milestone: {
    position: 'absolute',
    top: -10,
    alignItems: 'center',
  },
  milestoneText: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: -10,
    color: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  eventItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  eventText: {
    fontSize: 16,
    color: 'black',
  },
  emissionsText: {
    fontSize: 14,
    color: 'black', 
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  horizontalScrollViewContent: {
    flexDirection: 'row',
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  tableCellText: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  emissionsBox: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    alignItems: 'center',
  },
  emissionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emissionsValue: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: 14,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
    color: '#fff',
  },
  memberItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedMemberItem: {
    backgroundColor: '#d0f0c0',
  },
  value: {
    fontSize: 16,
    color: '#fff',
  },
  email: {
    color: 'black',
    fontSize: 14,
  },
  engagement: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  engagementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  engagementDate: {
    fontSize: 16,
    marginTop: 5,
    color: '#fff',
  },
  engagementWebsite: {
    fontSize: 16,
    marginTop: 5,
    color: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signUpMessage: {
    fontSize: 16,
    color: 'green',
    marginTop: 20,
    textAlign: 'center',
  },
});