import React from 'react';
import { View, Text, Pressable } from 'react-native-web';
import { triggerHaptic } from '../utils/haptics';

interface RNButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  style?: any;
  textStyle?: any;
  icon?: React.ReactNode;
  haptic?: 'light' | 'medium' | 'success';
  disabled?: boolean;
}

export const RNButton: React.FC<RNButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  icon,
  haptic = 'light',
  disabled = false,
}) => {
  const handlePress = () => {
    if (disabled) return;
    triggerHaptic(haptic);
    onPress();
  };

  const getVariantStyle = (pressed: boolean) => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: pressed ? '#B5F228' : '#C6FF3D',
          borderWidth: 0,
        };
      case 'secondary':
        return {
          backgroundColor: pressed ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.12)',
        };
      case 'outline':
        return {
          backgroundColor: pressed ? 'rgba(198,255,61,0.1)' : 'transparent',
          borderWidth: 1,
          borderColor: pressed ? '#C6FF3D' : 'rgba(255,255,255,0.18)',
        };
      case 'ghost':
        return {
          backgroundColor: pressed ? 'rgba(255,255,255,0.08)' : 'transparent',
          borderWidth: 0,
        };
    }
  };

  const getTextColor = (): string => {
    if (variant === 'primary') return '#0A0A0C';
    return '#FFFFFF';
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }: { pressed: boolean }) => [
        styles.buttonBase,
        getVariantStyle(pressed),
        {
          transform: [{ scale: pressed ? 0.97 : 1 }],
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <View style={styles.buttonContent}>
        {typeof children === 'string' ? (
          <Text
            style={[
              styles.buttonText,
              { color: getTextColor(), fontWeight: variant === 'primary' ? '700' : '600' },
              textStyle,
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
        {icon && <View style={styles.iconContainer}>{icon}</View>}
      </View>
    </Pressable>
  );
};

export const RNCard: React.FC<{
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
}> = ({ children, style, onPress }) => {
  if (onPress) {
    return (
      <Pressable
        onPress={() => {
          triggerHaptic('light');
          onPress();
        }}
        style={({ pressed }: { pressed: boolean }) => [
          styles.card,
          {
            transform: [{ scale: pressed ? 0.985 : 1 }],
            borderColor: pressed ? 'rgba(198,255,61,0.4)' : 'rgba(255,255,255,0.1)',
          },
          style,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = {
  buttonBase: {
    borderRadius: 9999,
    paddingVertical: 12,
    paddingHorizontal: 22,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    minHeight: 44,
  },
  buttonContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 8,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Space Grotesk, Plus Jakarta Sans, sans-serif',
  },
  iconContainer: {
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#121216',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden' as const,
  },
};
