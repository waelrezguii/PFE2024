package projet.pfe.model;

import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvDate;

import java.time.LocalDate;

public class CoursCsv {
    @CsvDate("yyyy-MM-dd")
    @CsvBindByName(column = "date_cours")
    private LocalDate date_cours;

    @CsvBindByName(column = "CodeB")
    private String codeB;

    @CsvBindByName(column = "Codedev")
    private String codedev;

    @CsvBindByName(column = "Nomdevise")
    private String nomdevise;

    @CsvBindByName(column = "Achat")
    private Double achat;

    @CsvBindByName(column = "Vente")
    private Double vente;

    // Getters and setters...
    public LocalDate getDate_cours() {
        return date_cours;
    }

    public void setDate_cours(LocalDate date_cours) {
        this.date_cours = date_cours;
    }

    public String getCodeB() {
        return codeB;
    }

    public void setCodeB(String codeB) {
        this.codeB = codeB;
    }

    public String getCodedev() {
        return codedev;
    }

    public void setCodedev(String codedev) {
        this.codedev = codedev;
    }

    public String getNomdevise() {
        return nomdevise;
    }

    public void setNomdevise(String nomdevise) {
        this.nomdevise = nomdevise;
    }

    public Double getAchat() {
        return achat;
    }

    public void setAchat(Double achat) {
        this.achat = achat;
    }

    public Double getVente() {
        return vente;
    }

    public void setVente(Double vente) {
        this.vente = vente;
    }
}
