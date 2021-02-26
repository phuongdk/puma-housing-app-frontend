import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import numeral from "numeral";
import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Carousel from "react-native-snap-carousel";

import { Box, Text } from "../../components";
import { getImageUrl } from "../../helpers";
import { useLocalization } from "../../localization";
import { Property } from "../../models";
import NavigationNames from "../../navigations/NavigationNames";
import { Theme } from "../../theme";

const WIDTH = Dimensions.get("window").width;

const PropertyDetail: React.FC<{
  iconName: string;
  title: string;
}> = ({ iconName, title }) => (
  <View style={styles.propertyContent}>
    <FontAwesome name={iconName} size={16} color="#aaaaaa" />
    <Text style={styles.propertyTitle}>{title}</Text>
  </View>
);

export const SearchMapScreen = () => {
  const navigation = useNavigation();
  const { getString } = useLocalization();
  const { params } = useRoute();
  const refMap = useRef<MapView>();
	// const resultList = params["resultList"] as Property[];
	const item = params["item"];

  navigation.setOptions({
    title: getString("Map"),
  });

  // const initialRegion =
  //   resultList.length > 0
  //     ? {
  //         latitude: resultList[0].latitude,
  //         longitude: resultList[0].longitude,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       }
	// 		: null;

	const initialRegion =
	item.latitude && item.longitude
		? {
				latitude: item.latitude,
				longitude: item.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			}
		: null;

  return (
    <>
      <MapView
        ref={refMap}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        initialRegion={initialRegion}
      >
        {/* {resultList.map((marker, index) => (
          <Marker
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            key={`markerKey${index}`}
          />
        ))} */}
				<Marker
					coordinate={{
						latitude: item.latitude,
						longitude: item.longitude,
					}}
					title={item.title}
					key={`markerKey${item.id}`}
				/>
      </MapView>
      <View style={styles.bottomView}>
        <Carousel
          data={[item]}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                navigation.navigate(
                  NavigationNames.PropertyDetailScreenForSearchTab,
                  { model: { ...item } }
                )
              }
            >
              <Box style={styles.pagerItemContainer}>
                <Image
                  source={{ uri: getImageUrl(item.imageNames.split(",")[0]) }}
                  style={styles.previewImage}
                />
                <View style={styles.informationRows}>
								<Text style={styles.titleText} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.locationText} numberOfLines={2}>
                    {item.address}
                  </Text>
                  <Text style={styles.priceText}>
                    {`${item.currency} ${numeral(item.price).format(
                      " 0,0"
                    )}`}
                  </Text>
                  <View style={styles.propertiesContainer}>
                    <PropertyDetail
                      iconName="bed"
                      title={String(item.bedRoomCount)}
                    />
                    <PropertyDetail
                      iconName="bath"
                      title={String(item.bathRoomCount)}
                    />
                    <PropertyDetail
                      iconName="car"
                      title={String(item.parkingCount)}
                    />
                  </View>
                </View>
              </Box>
            </TouchableOpacity>
          )}
          sliderWidth={WIDTH}
          itemWidth={WIDTH - 32}
          itemHeight={160}
          firstItem={0}
          loop
          accessibilityElementsHidden={false}
          onSnapToItem={(index) =>
            refMap.current.animateToRegion({
              latitude: item.latitude,
              longitude: item.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            })
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  bottomView: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
  },
  pagerItemContainer: { padding: 14, flexDirection: "row", marginVertical: 8 },
  previewImage: { width: 110, height: 110, borderRadius: 8 },
  informationRows: {
    paddingStart: 16,
    justifyContent: "center",
    flex: 1,
  },
  priceText: {
    fontFamily: "default-medium",
    fontSize: 20,
    color: Theme.colors.primaryColorDark,
    marginTop: 8,
    textAlign: "justify",
	},
	titleText: {
		fontFamily: "default-medium",
		color: "black",
		fontSize: 16,
		textAlign: "justify",
	},
  locationText: {
    fontFamily: "default-medium",
    color: "black",
    opacity: 0.4,
    fontSize: 13,
		textAlign: "justify",
		marginTop: 8,
  },
  propertiesContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  propertyContent: {
    flexDirection: "row",
    marginStart: 4,
    marginEnd: 8,
    marginTop: 16,
  },
  propertyTitle: {
    fontFamily: "default-medium",
    fontSize: 12,
    marginTop: 1,
    color: "#aaaaaa",
    marginHorizontal: 8,
    textAlign: "justify",
  },
});
