package QuantityMeasurementApp;

import com.quantity.measurement.enums.LengthUnit;
import com.quantity.measurement.model.QuantityLength;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MeasurementApplication {

    public static void main(String[] args) {

        QuantityLength q1 = new QuantityLength(2.0, LengthUnit.CENTIMETERS);
        QuantityLength q2 = new QuantityLength(2.0, LengthUnit.YARDS);

        System.out.println(q1.equals(q2));
    }
}