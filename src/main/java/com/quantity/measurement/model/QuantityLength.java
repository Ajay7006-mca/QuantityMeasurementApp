package com.quantity.measurement.model;

import com.quantity.measurement.enums.LengthUnit;

public class QuantityLength {

    private static final double EPSILON = 1e-6;

    private final double value;
    private final LengthUnit unit;

    // Constructor
    public QuantityLength(double value, LengthUnit unit) {
        if (unit == null)
            throw new IllegalArgumentException("Unit should not be null");

        if (!Double.isFinite(value))
            throw new IllegalArgumentException("Invalid value");

        this.value = value;
        this.unit = unit;
    }

    // Getters
    public double getValue() {
        return value;
    }

    public LengthUnit getUnit() {
        return unit;
    }

    // Convert to base unit (feet)
    private double toBaseUnit() {
        return unit.toFeet(value);
    }

    // Add with target unit
    public QuantityLength add(QuantityLength other, LengthUnit targetUnit) {

        if (other == null || targetUnit == null)
            throw new IllegalArgumentException("Other quantity and target unit must not be null");

        if (!Double.isFinite(other.value))
            throw new IllegalArgumentException("Invalid value in other quantity");

        double thisInFeet = this.toBaseUnit();
        double otherInFeet = other.toBaseUnit();

        double sumInFeet = thisInFeet + otherInFeet;

        double result = targetUnit.fromFeet(sumInFeet);

        return new QuantityLength(result, targetUnit); // immutability
    }

    // Overloaded add
    public QuantityLength add(QuantityLength other) {
        return add(other, this.unit);
    }

    // Convert instance value
    public double toConvert(LengthUnit targetUnit) {
        return convert(this.value, this.unit, targetUnit);
    }

    // Static conversion method
    public static double convert(double value, LengthUnit sourceUnit, LengthUnit targetUnit) {

        if (sourceUnit == null || targetUnit == null)
            throw new IllegalArgumentException("Units should not be null");

        if (!Double.isFinite(value))
            throw new IllegalArgumentException("Invalid numeric value");

        double valueInFeet = sourceUnit.toFeet(value);
        return targetUnit.fromFeet(valueInFeet);
    }

    // Equals method (important for UC1, UC2)
    @Override
    public boolean equals(Object obj) {

        if (this == obj) return true;

        if (obj == null || getClass() != obj.getClass()) return false;

        QuantityLength other = (QuantityLength) obj;

        double thisInFeet = this.toBaseUnit();
        double otherInFeet = other.toBaseUnit();

        return Math.abs(thisInFeet - otherInFeet) < EPSILON;
    }
}