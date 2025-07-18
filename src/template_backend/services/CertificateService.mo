import Types "../types/Certificate";
module {
  private stable var certificates: [Types.Certificate] = [];

  public func addCertificate(c: Types.Certificate): async () {
    certificates := Array.append(certificates, [c]);
  };

  public func getAllCertificates(): async [Types.Certificate] {
    return certificates;
  };
}
