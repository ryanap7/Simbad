import Header from "@/components/Header";
import RecentActivities from "@/components/RecentActivities";
import Statistic from "@/components/Statistic";
import { GlobalTheme } from "@/themes/Styles";
import React from "react";
import { SafeAreaView } from "react-native";

const Dashboard = () => {
  return (
    <SafeAreaView style={GlobalTheme.full}>
      <Header />
      <Statistic />
      <RecentActivities />
    </SafeAreaView>
  );
};

export default Dashboard;
